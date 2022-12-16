import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundsMapPageRoutingModule } from './sounds-map-routing.module';

import { SoundsMapPage } from './sounds-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoundsMapPageRoutingModule
  ],
  declarations: [SoundsMapPage]
})
export class SoundsMapPageModule {}
