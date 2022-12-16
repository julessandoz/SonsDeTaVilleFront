import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordSoundPage } from './record-sound.page';

const routes: Routes = [
  {
    path: '',
    component: RecordSoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordSoundPageRoutingModule {}
