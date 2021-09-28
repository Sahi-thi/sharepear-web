import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonalRecords, Groups } from './personal.model'
@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  public PersonalRecors?: PersonalRecords;
  public groups?:Groups;
  constructor(protected httpClient: HttpClient) { }

  //Get personal records
  getPeronalRecordsService( type:any,callback: any) {
    const url = environment.api_end_point + '/records?record_type='+type;
    console.log(url);
    this.httpClient
      .get(url)
      .subscribe((PersonalRecors:PersonalRecords) => {
        console.log(PersonalRecors)
        callback(1, PersonalRecors);
      },  (err) => {
        console.log(err);
      });
  }

//Get all groups
getAllGroupsService( callback: any) {
  const url = environment.api_end_point + '/groups';
  console.log(url);
  this.httpClient
    .get(url)
    .subscribe((groups:Groups) => {
      console.log(groups)
      callback(1, groups);
    },  (err) => {
      console.log(err);
    });
}
}
