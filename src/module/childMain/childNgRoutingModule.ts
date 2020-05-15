import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { AuthInventar } from '../../app/security/model/securityModel';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/ts/viewOkp2';
import { ModelPreCheck } from '../../app/otdels/otdels/PreCheck/ts/wiewPreCheck';
import { DatabaseAutoUl } from '../../app/otdels/otdels/dataBaseUl/ts/databaseAutoUl';

const appRoutes: Routes = [
  {
      path: '',
      component: MainChildOtdel,
      canActivate: [AuthInventar],
      children:[
        {
          path: 'nalog129',
          component: ModelOkp2
        },
        { path: 'preCheck',
          component: ModelPreCheck
        },
        {
          path:'modelUl',
          component:DatabaseAutoUl
        }
      ]
  }];

@NgModule({
  imports: [
      RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class ChildNgRoutingAutoModule { }
