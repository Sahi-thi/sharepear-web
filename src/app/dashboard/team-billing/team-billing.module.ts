import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamBillingRoutingModule } from './team-billing-routing.module';
import { TeamBillingComponent } from './team-billing.component';


@NgModule({
  declarations: [TeamBillingComponent],
  imports: [
    CommonModule,
    TeamBillingRoutingModule
  ]
})
export class TeamBillingModule { }
