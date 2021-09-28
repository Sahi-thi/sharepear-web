import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardGuard } from './dashboard.guard'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'personal',
        loadChildren: () =>
          import('./personal/personal.module').then((m) => m.PersonalModule),
          canActivate:[DashboardGuard]
      },
      {
        path: 'contributed',
        loadChildren: () =>
          import('./contributed/contributed.module').then(
            (m) => m.ContributedModule
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorites.module').then((m) => m.FavoritesModule),
      },
      {
        path: 'completed',
        loadChildren: () =>
          import('./completed/completed.module').then((m) => m.CompletedModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsModule),
      },
      {
        path: 'team-billing',
        loadChildren: () =>
          import('./team-billing/team-billing.module').then(
            (m) => m.TeamBillingModule
          ),
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
