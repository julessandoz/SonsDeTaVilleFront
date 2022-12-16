import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoundsMapPage } from './sounds-map.page';

const routes: Routes = [
  {
    path: '',
    component: SoundsMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundsMapPageRoutingModule {}
