import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { AllProductItemsComponent } from './all-product-items/all-product-items.component';
import { ProductVideosComponent } from './product-videos/product-videos.component';
import { ProductScreenshotsComponent } from './product-screenshots/product-screenshots.component';

@NgModule({
  declarations: [
    GroupsComponent,
    AllProductItemsComponent,
    ProductScreenshotsComponent,
    ProductVideosComponent,
  ],
  imports: [CommonModule, GroupsRoutingModule],
})
export class GroupsModule {}
