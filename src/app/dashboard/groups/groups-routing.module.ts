import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { AllProductItemsComponent } from './all-product-items/all-product-items.component';
import { ProductScreenshotsComponent } from './product-screenshots/product-screenshots.component';
import { ProductVideosComponent } from './product-videos/product-videos.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      { path: '', redirectTo: 'all-group-items', pathMatch: 'full' },
      { path: 'all-group-items', component: AllProductItemsComponent },
      { path: 'group-videos', component: ProductScreenshotsComponent },
      { path: 'group-screenshots', component: ProductVideosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
