import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubCommentsResponse } from '../player.model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-view-all-comments',
  templateUrl: './view-all-comments.component.html',
  styleUrls: ['./view-all-comments.component.css']
})
export class ViewAllCommentsComponent implements OnInit {
  subCommentsArray?: SubCommentsResponse;
  addNewSubCommentForm: any = FormGroup;
  requestObject: any;
  activityId !: number;

  constructor(private playerService: PlayerService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(

  ) {
    this.activatedRoute.params
      .subscribe((params) => {
        console.log({ params });
        if (params['activity_id'] != undefined) {
          this.activityId = params['activity_id'];
        }
      });
    this.getSubCommentsData();
    this.addSubCommentFormData();

  }
  addSubCommentFormData() {
    this.addNewSubCommentForm = this.formBuilder.group({
      // name: new FormControl('', []),
      content: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  getSubCommentsData() {
    this.playerService.getSubCommentsService((status: any, response: any) => {
      console.log({ response });
      this.subCommentsArray = response.sub_comments;

    });
  }
  onClickAddSubComment() {
    if (this.addNewSubCommentForm.valid) {
      console.log(this.addNewSubCommentForm.value);
      this.requestObject = {
        ...this.addNewSubCommentForm.value

      };
      this.playerService.addNewSubCommentService(this.activityId ,this.requestObject, (status: string, response: any) => {
        console.log({ response });

      });
    }

  }
}
