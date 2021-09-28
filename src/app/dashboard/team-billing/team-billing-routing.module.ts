import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamBillingComponent } from './team-billing.component';

const routes: Routes = [{ path: '', component: TeamBillingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamBillingRoutingModule { }
