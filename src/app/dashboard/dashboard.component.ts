import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isCreatingAccount: boolean = false;
  isShowingNotification: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  createAccount(eve: any) {
    eve.stopPropagation();
    this.isCreatingAccount = true;
  }
  cancelCreateAccount(eve: any) {
    eve.stopPropagation();
    this.isCreatingAccount = false;
  }

  showNotification() {
    this.isShowingNotification = !this.isShowingNotification;
    if (this.isShowingNotification) {
      this.isShowingNotification = true;
    } else {
      this.isShowingNotification = false;
    }
  }
}
