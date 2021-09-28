import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributedRoutingModule } from './contributed-routing.module';
import { ContributedComponent } from './contributed.component';
import { AllContributeItemsComponent } from './all-contribute-items/all-contribute-items.component';
import { ContributeScreenshotsComponent } from './contribute-screenshots/contribute-screenshots.component';
import { ContributeVideosComponent } from './contribute-videos/contribute-videos.component';

@NgModule({
  declarations: [
    ContributedComponent,
    AllContributeItemsComponent,
    ContributeScreenshotsComponent,
    ContributeVideosComponent,
  ],
  imports: [CommonModule, ContributedRoutingModule],
})
export class ContributedModule {}
