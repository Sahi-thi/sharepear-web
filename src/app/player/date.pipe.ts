import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log({ value });
    const local_date = moment
      .utc(value)
      .local()
      .format('MM/DD/YYYY');
    const date = new Date();
    // console.log(local_date);
    let todayDate = formatDate(date, 'MM/dd/yyyy', 'en-US')
    // console.log({ todayDate });

    const yesterday = new Date(date);
    let yesterdayString = yesterday.setDate(yesterday.getDate() - 1);
    let yesterDaydate = formatDate(yesterdayString, 'MM/dd/yyyy', 'en-US', '+0530')

    if (local_date === todayDate) {
      // console.log('ggggggg');

      const date = moment.utc(value).local().format('HH:mm:ss');

      let result = moment(date).fromNow();
      // console.log({ result });

      return result;
    }
    else if (local_date === yesterDaydate) {
      return 'Yesterday';
    }
    else {
      return local_date;
    }
    //commenting old code


    // console.log('local date', local_date)
    // // let result = moment(local_date).fromNow();
    // return local_date;
  }
}