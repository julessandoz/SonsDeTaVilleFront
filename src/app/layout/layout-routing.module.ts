import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        // Route that loads the SoundsMap module
        path: "sounds-map",
        loadChildren: () =>
          import("./sounds-map/sounds-map.module").then(
            (m) => m.SoundsMapPageModule
          ),
      },
      {
        // Route that loads the RecordSound module
        path: "record-sound",
        loadChildren: () =>
          import("./record-sound/record-sound.module").then((m) => m.RecordSoundPageModule),
      },
      {
        // Route that loads the AccountPage module
        path: "account",
        loadChildren: () =>
          import("./account/account.module").then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: 'account-param',
        loadChildren: () => import('./account-param/account-param.module').then( m => m.AccountParamPageModule)
      },
      {
        path: "",
        redirectTo: "record-sound", // Or whatever tabs is your default one
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
