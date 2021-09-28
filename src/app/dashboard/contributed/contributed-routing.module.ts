import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributedComponent } from './contributed.component';
import { AllContributeItemsComponent } from './all-contribute-items/all-contribute-items.component';
import { ContributeVideosComponent } from './contribute-videos/contribute-videos.component';
import { ContributeScreenshotsComponent } from './contribute-screenshots/contribute-screenshots.component';

const routes: Routes = [
  {
    path: '',
    component: ContributedComponent,
    children: [
      { path: '', redirectTo: 'all-contribute-items', pathMatch: 'full' },
      { path: 'all-contribute-items', component: AllContributeItemsComponent },
      { path: 'contribute-videos', component: ContributeVideosComponent },
      {
        path: 'contribute-screenshots',
        component: ContributeScreenshotsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributedRoutingModule {}
