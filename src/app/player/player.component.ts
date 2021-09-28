import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { AllCommentsResponse } from './player.model';
import { PlayerService } from './player.service';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  videoElement: any = HTMLElement;
  thumbnailDiv: any;

  drawCanvas: any;
  drawContext: any;
  readOnlyCanvas: any;
  readOnlyContext: any;
  initialCanvas: any;
  initialContext: any;
  progressbar: any;
  playPauseBtn: any;
  muteUnmuteIcon: any;
  isDrawPointer = true;
  coordinatesArray: Array<any> = [];
  pointerCoordinatesArray: Array<any> = [];
  // isClearCanvas = false;
  isCanvasType = 'pointer';
  isDrawMarker = false;
  isThumbnailClicked = false;
  imageThumbnailData = new Map<number, object>();
  addCommentSubscription$: any = Subscription;
  addNewComment = false;
  volumeAdjust: any;
  isDoubleClick = false;
  resizeObservable$: any;
  resizeSubscription$: any = Subscription;
  scaleFactor: any;
  originalVideoWidth: any;
  originalVideoHeight: any;
  allCommentsResponseArray !: AllCommentsResponse;

  type?: String;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {

    // subscribing data on click add new comment
    this.addCommentSubscription$ = this.playerService.addNewCommentData.subscribe(data => {
      if (data) {
        this.addNewComment = true;
        const currentVideoPlayingTime = this.videoElement.currentTime;
        console.log({ currentVideoPlayingTime });

        const thumbnailObject = { type: this.isCanvasType, data: this.coordinatesArray };
        console.log({ thumbnailObject });

        this.imageThumbnailData.set(currentVideoPlayingTime, thumbnailObject);
        this.coordinatesArray = [];
        this.isDrawMarker = false;
        this.isDrawPointer = false;
        if (this.videoElement.play) {
          this.videoElement.pause();
        }
        this.setprogressBarImageThumbnails();
        this.playerService.onClickIcons.next(false);
      }
      this.getAllComments();
    });

    this.initializeVideoIds();
    this.initVideoData();
    this.onResizeWindow();
  }

  // video ids initialisation
  initializeVideoIds() {
    this.videoElement = document.getElementById('videoID');
    this.playPauseBtn = document.getElementById('playPauseIcon');
    this.muteUnmuteIcon = document.getElementById('muteUnmuteIcon');
    this.drawCanvas = document.getElementById('drawCanvas');
    this.drawContext = this.drawCanvas.getContext('2d');
    this.readOnlyCanvas = document.getElementById('readOnlyCanvas');
    this.readOnlyContext = this.readOnlyCanvas.getContext('2d');
    this.initialCanvas = document.getElementById('initialCanvas');
    this.initialContext = this.initialCanvas.getContext('2d');
    this.progressbar = document.getElementById('progressbar');
    this.volumeAdjust = document.getElementById('volume');
  }

  // set video url to video element
  initVideoData() {
    this.videoElement.setAttribute(
      'src', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    // 'src', 'https://vjs.zencdn.net/v/oceans.mp4');
    this.videoElement.setAttribute('autobuffer', true);
    this.videoElement.load();

    // event fired when video finished loading
    this.videoElement.addEventListener(
      'loadeddata',
      () => {
        this.loadVideo();
        this.setprogressBarImageThumbnails();
      }, PlayerComponent.bind(this),
      false
    );

    // event fired after meta data loaded
    this.videoElement.addEventListener(
      'loadedmetadata',
      () => {
        // video duration ms to minutes conversion
        const minutes = Math.floor(this.videoElement.duration / 60);
        const seconds = Math.floor(this.videoElement.duration - minutes * 60);


        this.originalVideoHeight = this.videoElement.videoHeight;
        this.originalVideoWidth = this.videoElement.videoWidth;

        // updating inital time duration
        (document.getElementById('currentDurationTime') as HTMLInputElement).innerHTML = '0.00';
        (document.getElementById('totalDurationTime') as HTMLInputElement).innerHTML = minutes + ':' + seconds;
        this.volumeAdjust.value = 50;
        this.videoElement.volume = 0.5;

        // scale factor calculation
        const videoFrameWidthElement: any = document.getElementById('videoContentCanvasDisplay');
        const videoContentWidthElement: any = document.getElementById('videoID');
        const videoFrameWidth = videoFrameWidthElement.getBoundingClientRect().width;
        const videoContentWidth = videoContentWidthElement.getBoundingClientRect().width;
        if (this.originalVideoWidth > videoContentWidth) {
          this.scaleFactor = this.originalVideoWidth / videoContentWidth;
        } else {
          this.scaleFactor = videoContentWidth / this.originalVideoWidth;
        }

        // update canvas height as per video height
        const hRatio = (videoFrameWidth / this.videoElement.videoWidth) * this.videoElement.videoHeight;
        this.videoElement.height = hRatio;
        const result = (540 / 2) - (hRatio / 2);
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = result + 'px';
        this.readOnlyCanvas.width = videoFrameWidth;
        this.readOnlyCanvas.height = hRatio;
        this.readOnlyCanvas.style.top = result + 'px';
        this.drawCanvas.width = videoFrameWidth;
        this.drawCanvas.height = hRatio;
        this.drawCanvas.style.top = result + 'px';
      }, PlayerComponent.bind(this),
      false
    );

  }

  // set video time and update progress
  loadVideo() {


    // updating progress bar as per video current duration tim
    const updateProgressBar = () => {

      const currentTimeMinutes = Math.floor(this.videoElement.currentTime / 60);
      const seconds = Math.floor(this.videoElement.currentTime - currentTimeMinutes * 60);
      const currentTimeSeconds = seconds < 10 ? '0' + seconds : seconds;
      // updating current duration  time minutes
      const currentDurationMinutes = currentTimeMinutes + ':' + currentTimeSeconds;
      (document.getElementById('currentDurationTime') as HTMLInputElement).innerHTML = currentDurationMinutes;
      // Update the progress bar's value
      const percentage = (100 / this.videoElement.duration) * this.videoElement.currentTime;
      this.progressbar.value = percentage;
    };

    this.videoElement.addEventListener('timeupdate', updateProgressBar.bind(this), false);

    this.drawCanvas.addEventListener('dblclick', (e: MouseEvent) => {
      console.log('double click event fired');
      this.isDoubleClick = true;
      this.isCanvasType = 'doubleClick';
      // (document.getElementById("videoID")as HTMLInputElement).style.border = 'solid #a7cf1d';
      this.videoElement.pause();
      this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
    });

    const coord = { x: 0, y: 0 };
    let markerDraw = false;

    // mouse down event
    this.drawCanvas.addEventListener('mousedown', (e: MouseEvent) => {
      // console.log(this.isClearCanvas);

      this.pointerCoordinatesArray = [];
      if (this.isCanvasType === 'pointer' || this.isCanvasType === 'doubleClick') {
        this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      }
      markerDraw = true;
      coord.x = e.clientX - this.drawCanvas.offsetLeft - (document.getElementById('videoContentCanvasDisplay') as HTMLInputElement)
        .getBoundingClientRect().left;
      coord.y = e.clientY - this.drawCanvas.offsetTop - (document.getElementById('videoContentCanvasDisplay') as HTMLInputElement)
        .getBoundingClientRect().top;
      const xPoint = e.offsetX;
      const yPoint = e.offsetY;
      // double click initialization
      if (this.isDoubleClick && this.videoElement.currentTime > 0) {
      if (this.isDrawMarker === false && this.isDrawPointer === false) {
        const currentTimeMinutes = Math.floor(this.videoElement.currentTime / 60);
        const seconds = Math.floor(this.videoElement.currentTime - currentTimeMinutes * 60);
        const currentTimeSeconds = seconds < 10 ? '0' + seconds : seconds;
        this.playerService.onClickIcons.next(currentTimeMinutes + ' :' + currentTimeSeconds);
        this.drawContext.beginPath();
        const videoContentWidthElement: any = document.getElementById('videoID');
        const videoContentHeightElement: any = document.getElementById('videoID');
        const videoContentWidth = videoContentWidthElement.getBoundingClientRect().width;
        const videoContentHeight = videoContentHeightElement.getBoundingClientRect().height;
        // console.log({ videoContentWidth });
        // console.log({ videoContentHeight });
        this.drawContext.lineWidth = 9;
        // this.drawContext.lineCap = 'round';
        // this.drawContext.lineWidth = 5;
        this.drawContext.strokeStyle = '#a7cf1d';
        this.drawContext.strokeRect(0, 0, videoContentWidth, videoContentHeight);
        this.pointerCoordinatesArray.push({ x: videoContentWidth, y: videoContentHeight });
      }
      }
      if (this.isDrawPointer && this.videoElement.currentTime > 0) {
        // this.playerService.onClickIcons.next(this.videoElement.currentTime);
        // const currentTimeMinutes = Math.floor(this.videoElement.currentTime / 60);
        // const seconds = Math.floor(this.videoElement.currentTime - currentTimeMinutes * 60);
        // const currentTimeSeconds = seconds < 10 ? '0' + seconds : seconds;
        this.drawContext.strokeStyle = '#a7cf1d';
        this.drawContext.fillStyle = '#a7cf1d';
        this.drawContext.beginPath();
        this.drawContext.moveTo(xPoint + 9.5, yPoint);
        this.drawContext.arc(xPoint, yPoint, 9.5, 0, Math.PI * 2);
        this.drawContext.fill();
        this.pointerCoordinatesArray.push({ x: xPoint * this.scaleFactor, y: yPoint * this.scaleFactor });
        let pointerObj: any = {};
        pointerObj.type = 'pointer';
        pointerObj.co_ordinates = this.pointerCoordinatesArray
        this.playerService.onClickIcons.next(pointerObj);
      }
    });


    // executed if we click on inside video {drawpoint is true}
    this.drawCanvas.addEventListener('mouseup', (e: MouseEvent) => {
      // if (markerDraw) {
      this.coordinatesArray.push(this.pointerCoordinatesArray);
      console.log(this.coordinatesArray);
      const markerObj: any = {};
      markerObj.type = this.type;
      markerObj.duration_start = this.videoElement.currentTime;
      markerObj.co_ordinates = this.pointerCoordinatesArray;
      this.playerService.onClickIcons.next(markerObj);
      this.pointerCoordinatesArray = [];
      markerDraw = false;
      // }

    });

    // event fired when pointing device is moved {marker}
    this.drawCanvas.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isDrawMarker && this.videoElement.currentTime > 0) {
        // console.log(this.videoElement.currentTime);
        this.type = 'marker';
        // this.playerService.onClickIcons.next(this.videoElement.currentTime);
        const currentTimeMinutes = Math.floor(this.videoElement.currentTime / 60);
        const seconds = Math.floor(this.videoElement.currentTime - currentTimeMinutes * 60);
        const currentTimeSeconds = seconds < 10 ? '0' + seconds : seconds;

        if (!markerDraw) {
          return false;
        }

        this.drawContext.beginPath();
        this.drawContext.lineWidth = 5;
        this.drawContext.lineCap = 'round';
        this.drawContext.strokeStyle = '#a7cf1d';
        this.drawContext.moveTo(coord.x, coord.y);
        // this.isClearCanvas = true;
        this.isCanvasType = 'marker';

        // The cursor to start drawing moves to this coordinate
        coord.x = e.clientX - this.drawCanvas.offsetLeft - (document.getElementById('videoContentCanvasDisplay') as HTMLInputElement)
          .getBoundingClientRect().left;
        coord.y = e.clientY - this.drawCanvas.offsetTop - (document.getElementById('videoContentCanvasDisplay') as HTMLInputElement)
          .getBoundingClientRect().top;

        // A line is traced from start coordinate to this coordinate
        this.drawContext.lineTo(coord.x, coord.y);
        this.pointerCoordinatesArray.push({ x: coord.x * this.scaleFactor, y: coord.y * this.scaleFactor });
        this.drawContext.stroke();
      }
      //  if(this.drawContext.beginPath()){

      //  }
    });


    // event is fired when streaming is stopped
    this.videoElement.addEventListener(
      'ended', () => {
        this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
        this.videoElement.pause();
      }, PlayerComponent.bind(this),
      false
    );

    // called when we click on progressbar
    const updateProgressBarValue = (e: MouseEvent) => {
      this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      this.readOnlyContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      const percent = e.offsetX / this.progressbar.offsetWidth;
      this.videoElement.currentTime = percent * this.videoElement.duration;
      // e.target.value = Math.floor(percent / 100);
    };
    this.progressbar.addEventListener('click', updateProgressBarValue.bind(this));

  }

  setprogressBarImageThumbnails() {
    const thumbnailEvent = (thumbnailData: any, key: any, imgid: any) => {
      // let time = scope.videoElement.currentTime
      // this.playerService.onClickIcons.next(time);
      console.log(scope.videoElement.currentTime);
      console.log({ thumbnailData }
      );
      this.drawContext.clearRect(
        0,
        0,
        this.drawCanvas.width,
        this.drawCanvas.height
      );
      this.readOnlyContext.clearRect(
        0,
        0,
        this.drawCanvas.width,
        this.drawCanvas.height
      );
      // removing active class for image thumbnails
      try {
        const thumbnails: any = document.getElementsByClassName('thumbnail');
        if (thumbnails.length > 0) {
          for (let i = 0; i <= thumbnails.length - 1; i++) {

            thumbnails[i].classList.remove('active');

          }
        }
      } catch (err) {
        console.log(err);
      }
      this.videoElement.currentTime = key;
      this.videoElement.pause();
      this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
      this.isThumbnailClicked = true;
      imgid.classList.add('active');
      if (thumbnailData) {
        if (thumbnailData.type === 'marker' && thumbnailData.data.length > 0) {
          console.log('marker', thumbnailData.data);

          const resultData = thumbnailData.data;
          this.readOnlyContext.clearRect(
            0,
            0,
            this.drawCanvas.width,
            this.drawCanvas.height
          );
          this.readOnlyContext.strokeStyle = '#a7cf1d';
          this.readOnlyContext.lineWidth = 5;
          resultData.forEach((element: Array<any>) => {
            this.readOnlyContext.beginPath();
            this.readOnlyContext.moveTo(element[0].x / this.scaleFactor, element[0].y / this.scaleFactor);
            element.forEach((insideElement: any) => {
              this.readOnlyContext.lineTo(insideElement.x / this.scaleFactor, insideElement.y / this.scaleFactor);
            });
            this.readOnlyContext.stroke();
          });
        } else if (thumbnailData.type === 'pointer' && thumbnailData.data.length > 0) {
          const resultData = thumbnailData.data[0];
          console.log({ resultData });

          try {
            const x = resultData[0].x / this.scaleFactor;
            const y = resultData[0].y / this.scaleFactor;
            this.readOnlyContext.clearRect(
              0,
              0,
              this.drawCanvas.width,
              this.drawCanvas.height
            );
            this.readOnlyContext.strokeStyle = '#a7cf1d';
            this.readOnlyContext.fillStyle = '#a7cf1d';
            this.readOnlyContext.beginPath();
            this.readOnlyContext.moveTo(x + 9.5, y);
            this.readOnlyContext.arc(x, y, 9.5, 0, Math.PI * 2);
            this.readOnlyContext.fill();
          }
          catch (err) {
            console.log(err);
          }
        }
        else if (thumbnailData.type === 'doubleClick' && thumbnailData.data.length > 0) {
          console.log('double--------', thumbnailData.data);

          const resultData = thumbnailData.data[5];
          console.log(thumbnailData);
          
          this.drawContext.beginPath();

          this.readOnlyContext.clearRect(
            0,
            0,
            this.drawCanvas.width,
            this.drawCanvas.height
          );
          this.drawContext.lineWidth = 9;
          this.drawContext.strokeStyle = '#a7cf1d';
          this.drawContext.strokeRect(0, 0, resultData[0].x, resultData[0].y);
        }
      }
    };

    const scope = this;
    console.log(this.imageThumbnailData);
    if (this.imageThumbnailData) {

      this.imageThumbnailData.forEach((value, key: any) => {
        console.log({ value }, { key });
        // console.log();

        // debugger
        if (key <= scope.videoElement.duration) {
          console.log('img thumbnail if');

          const left = (key / scope.videoElement.duration) * 100 + '%';
          // Calculate position in percentage and add to the #seekbar.
          // Create marker and give it the left value.
          this.thumbnailDiv = document.createElement('div');
          const thumbnailImg = document.createElement('img');
          thumbnailImg.src =
            'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';
          thumbnailImg.id = key;
          console.log({ value });
          thumbnailImg.onclick = thumbnailEvent.bind(this, value, key, this.thumbnailDiv);
          thumbnailImg.classList.add('thumbnail-image');
          this.thumbnailDiv.appendChild(thumbnailImg);
          this.thumbnailDiv.classList.add('thumbnail');
          this.thumbnailDiv.style.left = left;
          const progressbar: any = document.getElementById('progressbarid');
          progressbar.appendChild(this.thumbnailDiv);
        }
      });
    }
  }

  // on click play/pause  icons
  onClickPlayVideo() {
    try {
      const thumbnails: any = document.getElementsByClassName('thumbnail');
      console.log({ thumbnails });
      if (thumbnails.length > 0) {
        for (let i = 0; i <= thumbnails.length - 1; i++) {
          thumbnails[i].classList.remove('active');
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.isDrawPointer = false;
    this.isDrawMarker = false;
    this.isDoubleClick = false;
    if (this.videoElement.paused) {
      this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      this.readOnlyContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      this.videoElement.play();
      this.playPauseBtn.src = '../../assets/pause.svg';
    } else {
      this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
      this.videoElement.pause();
    }
  }

  // on click mute/unmute icons
  onClickMuteUnmute() {

    if (!this.videoElement.muted) {
      this.muteUnmuteIcon.src = 'assets/volume_off.svg';
      this.videoElement.muted = true;
    }
    else {
      this.muteUnmuteIcon.src = '../../assets/volume_up.svg';
      this.videoElement.muted = false;
    }
  }

  onClickDrawPoint() {

    this.isDrawPointer = true;
    this.isDrawMarker = false;
    this.isCanvasType = 'pointer';
    if (this.videoElement.play) {
      this.videoElement.pause();
    }
    this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
  }

  onClickDrawText() {
    this.isDrawMarker = true;
    this.isDrawPointer = false;
    this.isDoubleClick = false;
    this.isCanvasType = 'pointer';
    if (this.videoElement.play) {
      this.videoElement.pause();
    }
    this.playPauseBtn.src = '../../assets/iconfinder-icon-14.svg';
  }

  onClickUndo() {
    this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    this.isDrawPointer = true;
    this.isDrawMarker = false;
  }

  onAdjustVolume(e: MouseEvent) {
    const percent = e.offsetX / this.volumeAdjust.offsetWidth;
    this.volumeAdjust.value = percent;
    this.videoElement.volume = percent;
    const value = (e.offsetX / 70) * 100;
    this.volumeAdjust.value = String(value).slice(0, 2);
  }

  onResizeWindow() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {

      const videoFrameWidthElement: any = document.getElementById('videoContentCanvasDisplay');
      const videoContentWidthElement: any = document.getElementById('videoID');
      const videoContentHeightElement: any = document.getElementById('videoID');
      const videoFrameWidth = videoFrameWidthElement.getBoundingClientRect().width;
      const videoContentWidth = videoContentWidthElement.getBoundingClientRect().width;
      const videoContentHeight = videoContentHeightElement.getBoundingClientRect().height;
      // console.log('video frame width : ', videoFrameWidth);
      // console.log('video content width : ', videoContentWidth);
      // console.log('video content height : ', videoContentHeight);
      if (this.originalVideoWidth > videoContentWidth) {
        this.scaleFactor = this.originalVideoWidth / videoContentWidth;
      } else {
        this.scaleFactor = videoContentWidth / this.originalVideoWidth;
      }
      const hRatio =
        (videoFrameWidth / this.originalVideoWidth) * this.originalVideoHeight;
      const result = (540 / 2) - (hRatio / 2);
      this.videoElement.style.position = 'absolute !important';
      this.videoElement.style.top = result + 'px';
      this.videoElement.height = hRatio;
      this.readOnlyCanvas.width = videoContentWidth;
      this.readOnlyCanvas.height = hRatio;
      this.readOnlyCanvas.style.top = result + 'px';
      this.drawCanvas.width = videoContentWidth;
      this.drawCanvas.height = hRatio;
      this.drawCanvas.style.top = result + 'px';

    });
  }

  getAllComments() {
    this.coordinatesArray = [];
    this.playerService.getAllCommentsService('active', (status: any, response: any) => {
      this.allCommentsResponseArray = response.comments;

      console.log(this.allCommentsResponseArray);
      response.comments.forEach((item: any) => {
        item.co_ordinates.forEach((coordinates: any) => {
          coordinates.x = Number(coordinates.x);
          coordinates.y = Number(coordinates.y);
          // console.log({ coordinates });

        });
        this.coordinatesArray.push(item.co_ordinates);
        const thumbnailObject = { type: 'pointer', data: this.coordinatesArray };

        this.imageThumbnailData.set(Number(item.duration_start), thumbnailObject);
      });
      this.setprogressBarImageThumbnails();

    });
  }
  ngOnDestroy() {
    if (this.addCommentSubscription$) {
      this.addCommentSubscription$.unsubscribe();
    }

  }
}
