import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { ScreenshotsComponent } from './screenshots/screenshots.component';
import { VideosComponent } from './videos/videos.component';
import { PersonalService} from './personal.service'
@NgModule({
  declarations: [
    PersonalComponent,
    AllItemsComponent,
    ScreenshotsComponent,
    VideosComponent,
  ],
    
    imports: [CommonModule, PersonalRoutingModule, HttpClientModule, ],
  providers: [
    PersonalService
  ]
})
export class PersonalModule {}
