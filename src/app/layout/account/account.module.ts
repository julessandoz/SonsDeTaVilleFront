import { SoundUserPageModule } from 'src/app/sound-user-page/sound-user-page.module';
import { CategoryButtonModule } from './../../category-button/category-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SoundPlayerModule } from 'src/app/sound-player/sound-player.module';


import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    CategoryButtonModule,
    SoundPlayerModule,
    SoundUserPageModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
