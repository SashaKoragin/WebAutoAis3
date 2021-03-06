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
import { IdentytiFaceOkp5 } from '../../app/otdels/otdels/okp5/identityFace/ts/viewIdentytiFaceOkp5';
import { AddIdentityFace } from '../../app/otdels/otdels/okp5/addIdentityFace/ts/addIdentityFace';
import { Sales } from '../../app/otdels/otdels/ovp2/Sales/ts/Sales';
import { DeliveryDocument } from '../../app/otdels/otdels/okp6/deliveryDocument/ts/deliveryDocument';
import { SalesBookBankUlFace } from '../../app/otdels/otdels/dataBaseUl/SalesBookBank/ts/salesBookBank';

const appRoutes: Routes = [
  {
    path: '',
    component: MainChildOtdel,
    canActivate: [AuthInventar],
    children: [
      {
        path: 'Sales',
        component: Sales
      },
      {
        path: 'DeliveryDocument',
        component: DeliveryDocument
      },
      {
        path: 'nalog129',
        component: ModelOkp2
      },
      {
        path: 'preCheck',
        component: ModelPreCheck
      },
      {
        path: 'modelUl',
        component: DatabaseAutoUl
      },
      {
        path: 'payment',
        component: ModelRaschetBudgPayment
      },
      {
        path: 'JournalPreCheck129',
        component: JournalPreCheck
      },
      //Компонент подписей для ОКП2
      {
        path: 'SignatureOkp2',
        component: SignatureOkp2
      },
      {
        path: '2ndfl',
        component: IdentytiFaceOkp5
      },
      {
        path: 'AddFile',
        component: AddIdentityFace
      },
      {
        path: 'salesBookBank',
        component:SalesBookBankUlFace
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
