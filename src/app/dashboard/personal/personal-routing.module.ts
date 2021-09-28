import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalComponent } from './personal.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { VideosComponent } from './videos/videos.component';
import { ScreenshotsComponent } from './screenshots/screenshots.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    children: [
      { path: '', redirectTo: 'all-items', pathMatch: 'full' },
      { path: 'all-items', component: AllItemsComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'screenshots', component: ScreenshotsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
