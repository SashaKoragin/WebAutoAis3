import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { AuthInventar } from '../../app/security/model/securityModel';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/ts/viewOkp2';
import { DatabaseAutoUl } from '../../app/otdels/otdels/dataBaseUl/ts/databaseAutoUl';
import { ModelRaschetBudgPayment } from '../../app/otdels/otdels/raschetBudg/ts/viewRaschetBudg';
import { ModelPreCheck } from 'src/app/otdels/otdels/PreCheck/ModelAdd/ts/wiewPreCheck';
import { JournalPreCheck } from '../../app/otdels/otdels/PreCheck/Journal129/ts/Journal129';

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
        },
        {
          path:'payment',
          component:ModelRaschetBudgPayment
        },
        {
          path:'JournalPreCheck129',
          component:JournalPreCheck
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
