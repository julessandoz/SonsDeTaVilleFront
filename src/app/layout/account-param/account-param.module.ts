import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountParamPageRoutingModule } from './account-param-routing.module';

import { AccountParamPage } from './account-param.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountParamPageRoutingModule
  ],
  declarations: [AccountParamPage]
})
export class AccountParamPageModule {}
