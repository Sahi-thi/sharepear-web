import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddNewCommentResponse, AddNewSubCommentResponse, AllCommentsResponse, SubCommentsResponse } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public addNewCommentData = new BehaviorSubject<any>(null);
  public onClickIcons = new BehaviorSubject<any>(null);
  public addNewCommentResponse?: AddNewCommentResponse;
  public addNewSubCommentResponse?: AddNewSubCommentResponse;
  constructor(protected httpClient: HttpClient) { }

  getAllCommentsService(status: string, callback: any) {
    const selectedStatus = !status !== undefined && status !== "" ? '?status=' + status : "";
    console.log({ selectedStatus });

    const url = environment.api_end_point + '/records/1/comments' + selectedStatus;
    this.httpClient.get(url).subscribe((data) => {
      // console.log(data);
      const response = data as AllCommentsResponse;
      // console.log({ AllCommentsResponse });
      callback(1, response);
    }, (err) => {
      console.log(err);
    });
  }
  addNewCommentService(request: any, callback: any) {
    console.log('in sev');
    const url = environment.api_end_point + '/records/1/comments';
    this.httpClient
      .post(url, request)
      .subscribe((addNewCommentResponse: AddNewCommentResponse) => {
        console.log({ addNewCommentResponse });
        this.addNewCommentResponse = addNewCommentResponse;
        callback(1, this.addNewCommentResponse);
      }, (err) => {
        console.log(err);
      });
  }

  getSubCommentsService(callback: any) {
    const url = environment.api_end_point + '/comments/1/subComments';
    this.httpClient.get(url).subscribe((data) => {
      console.log(data);
      callback(1, data);
    }, (err) => {
      console.log(err);
    });
  }
  addNewSubCommentService(commentId: number, request: any, callback: any) {
    console.log('in sev');
    const url = environment.api_end_point + '/comments/1/subComments';
    this.httpClient
      .post(url, request)
      .subscribe((addNewSubCommentResponse: AddNewSubCommentResponse) => {
        console.log({ addNewSubCommentResponse });
        this.addNewCommentResponse = addNewSubCommentResponse;
        callback(1, this.addNewSubCommentResponse);
      }, (err) => {
        console.log(err);
      });
  }
}
