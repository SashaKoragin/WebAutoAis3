import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { AuthInventar } from '../../app/security/model/securityModel';
import { DatabaseAutoUl } from '../../app/otdels/otdels/dataBaseUl/ts/databaseAutoUl';
import { ModelRaschetBudgPayment } from '../../app/otdels/otdels/raschetBudg/ts/viewRaschetBudg';
import { ModelPreCheck } from 'src/app/otdels/otdels/PreCheck/ModelAdd/ts/wiewPreCheck';
import { JournalPreCheck } from '../../app/otdels/otdels/PreCheck/Journal129/ts/Journal129';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/Journal121and129/ts/viewOkp2';
import { SignatureOkp2 } from '../../app/otdels/otdels/okp2/SignatureRuk/ts/signatureOkp2';

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
        },
        //Компонент подписей для ОКП2
        {
          path:'SignatureOkp2',
          component:SignatureOkp2
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
