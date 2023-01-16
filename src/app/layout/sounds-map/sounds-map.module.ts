import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundsMapPageRoutingModule } from './sounds-map-routing.module';

import { SoundsMapPage } from './sounds-map.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoundsMapPageRoutingModule,
    LeafletModule
  ],
  declarations: [SoundsMapPage]
})
export class SoundsMapPageModule {}
