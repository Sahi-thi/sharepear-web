import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../personal.service' ;
import { PersonalRecords } from '../personal.model';
import { AllGroups } from '../personal.model';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  public personalRecords!: PersonalRecords;
  public allgroups!: AllGroups;
  selectedRecord : Array<any> = [];
  selectedGroups : Array<any> = [];
  loader = false

  constructor(
    private personalService:PersonalService) { }
  ngOnInit(): void {
    this.getPeronalRecords()
  }
  ngAfterViewInit() {
    this.personalService.getAllGroupsService((status: string, response:any )=> {
      this.allgroups = response
    })
  }
  getPeronalRecords(){
    this.personalService.getPeronalRecordsService('video',(status: string, response:any ) => {
      this.personalRecords = response
      this.loader = true
      console.log(this.personalRecords.records)
    })
  }
  
  selectGroups(event:MouseEvent,group:any,index:number){
    console.log((<HTMLInputElement>event.target).checked,index)
    if((<HTMLInputElement>event.target).checked){
      this.selectedGroups.push(group)
    }
    else{
      this.selectedGroups?.splice(this.personalRecords?.records!.findIndex((record:any) =>record?.record_id! == group?.record_id),1)
    }
    console.log(this.selectedGroups)
  }

  copylink(link:string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getAllGroups(record:any){
      console.log(this.allgroups,record.groups)
      this.allgroups?.groups?.forEach((element:any) => {
        if(record.groups.some((data:any) =>data.id == element.id)){
          element.checked = true
          this.selectedRecord = record.record_id;
        }
        else{
          element.checked = false
        }
      });
  }
}
