import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddCommentsComponent } from './add-comments/add-comments.component';
import { ViewAllCommentsComponent } from './view-all-comments/view-all-comments.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './player.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from './date.pipe';


@NgModule({
  declarations: [PlayerComponent, VideoPlayerComponent, AddCommentsComponent, ViewAllCommentsComponent, DatePipe],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers : [PlayerService]
  // entryComponents:[PlayerComponent]

})
export class PlayerModule { }
