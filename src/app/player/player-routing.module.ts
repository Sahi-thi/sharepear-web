import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCommentsComponent } from './add-comments/add-comments.component';

import { PlayerComponent } from './player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ViewAllCommentsComponent } from './view-all-comments/view-all-comments.component';

const routes: Routes = [{
  path: '', component: PlayerComponent,
  children: [
    { path: '', redirectTo: 'comments', pathMatch: 'full' },

    { path: 'comments', component: AddCommentsComponent },

    { path: 'comments/:activity_id/all-comments', component: ViewAllCommentsComponent },
    // { path: 'all-comments', component: ViewAllCommentsComponent },
  ]
},

];
// const routes:Routes=[]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
