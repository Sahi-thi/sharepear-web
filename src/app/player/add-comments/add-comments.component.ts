import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AllCommentsResponse, Coordinates, SubCommentsResponse } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {
  isCompleted = false;
  onClickPointerDataSubscription!: Subscription;
  addNewComment = false;
  allCommentsResponseArray?: AllCommentsResponse;
  addNewCommentForm: any = FormGroup;
  requestObject: any;
  status = 'active';
  totalActiveCommentsCount?: number;
  totalCompletedCommentsCount?: number;
  durationTime?: string;
  co_ordiantes?: Coordinates;
  comment_category?: string;

  constructor(private playerService: PlayerService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.onClickPointerDataSubscription = this.playerService.onClickIcons.subscribe(data => {
      if (data) {
        console.log(data
        );
        this.durationTime = data.duration_start;
        this.co_ordiantes = data.co_ordinates;
        this.comment_category = data.type;
        this.addNewComment = true;
      }
      else { this.addNewComment = false; }
    });
    this.getAllComments(this.status);
    this.addCommentFormData();
  }
  addCommentFormData() {
    this.addNewCommentForm = this.formBuilder.group({
      // name: new FormControl('', []),
      content: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  getAllComments(statusType: string) {
    this.playerService.getAllCommentsService(statusType, (status: any, response: any) => {
      this.allCommentsResponseArray = response.comments;
      response.comments.forEach((item: any) => {
        console.log(item.duration_start);

        const minutes = Math.floor(item.duration_start / 60);
        const seconds = Math.floor(item.duration_start - minutes * 60);
        const currentTimeSeconds = seconds < 10 ? '0' + seconds : seconds;

        item.duration_start = minutes + ": " + currentTimeSeconds;

      });
      this.totalActiveCommentsCount = response.active_comments;
      this.totalCompletedCommentsCount = response.completed_comments;
      console.log(this.allCommentsResponseArray);

    });
  }
  // getSubCommentsData() {
  //   this.playerService.getSubCommentsService((status: any, response: any) => {
  //     console.log({ response });
  //     this.subCommentsArray =response.comments;

  //   });
  // }
  onClickActive() {
    this.isCompleted = false;
    this.getAllComments('active');
  }
  onClickCompleted() {
    this.isCompleted = true;
    this.getAllComments('completed');
  }

  onClickAddComment() {
    // console.log(this.addNewCommentForm.valid);
    if (this.addNewCommentForm.valid) {
      // console.log(this.addNewCommentForm.value);
      this.requestObject = {
        ...this.addNewCommentForm.value

      };
      this.requestObject.comment_type = 'text';
      this.requestObject.duration_start = this.durationTime;
      this.requestObject.status = 'active';
      this.requestObject.duration_end = 'null';
      this.requestObject.co_ordinates = this.co_ordiantes;
      this.requestObject.comment_category = this.comment_category;

      console.log('--------------', this.requestObject);
      this.playerService.addNewCommentService(this.requestObject, (status: string, response: any) => {
        console.log({ response });

      });
    }
    this.playerService.addNewCommentData.next(true);
  }
}
