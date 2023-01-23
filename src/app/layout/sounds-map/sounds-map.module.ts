import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundsMapPageRoutingModule } from './sounds-map-routing.module';

import { SoundsMapPage } from './sounds-map.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { SoundPlayerModule } from 'src/app/sound-player/sound-player.module';
import { CategoryButtonModule } from 'src/app/category-button/category-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoundsMapPageRoutingModule,
    LeafletModule,
    SoundPlayerModule,
    CategoryButtonModule
  ],
  declarations: [SoundsMapPage]
})
export class SoundsMapPageModule {}
