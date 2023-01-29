import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoundsMapPageRoutingModule } from './sounds-map-routing.module';

import { SoundsMapPage } from './sounds-map.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { SoundPlayerModule } from 'src/app/sound-player/sound-player.module';
import { CategoryButtonModule } from 'src/app/category-button/category-button.module';
import { SoundUserPageModule } from 'src/app/sound-user-page/sound-user-page.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoundsMapPageRoutingModule,
    LeafletModule,
    SoundPlayerModule,
    CategoryButtonModule,
    SoundUserPageModule
  ],
  declarations: [SoundsMapPage]

})
export class SoundsMapPageModule {}
