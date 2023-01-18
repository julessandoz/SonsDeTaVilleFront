import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountParamPage } from './account-param.page';

const routes: Routes = [
  {
    path: '',
    component: AccountParamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountParamPageRoutingModule {}
