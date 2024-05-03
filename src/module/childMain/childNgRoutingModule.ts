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
import { AddPatent } from '../../app/otdels/otdels/okp3/addPatent/ts/addPatentOkp3';
import { Patent } from '../../app/otdels/otdels/okp3/viewPatentReport/ts/patentOkp3';
import { Okp1Journal121 } from '../../app/otdels/otdels/okp1/Journal121/ts/viewOkp1Journal121';
import { ModelRegistrationFace } from '../../app/otdels/otdels/registration/ReestrFace/ts/viewRegistrationFace';
import { EasJournal } from '../../app/otdels/otdels/okp1/EasJournal/ts/viewEasJournal';
import { TaxDeclarationFl } from '../../app/otdels/otdels/okp6/TaxDeclarationFl/ts/taxDeclarationFl';
import { Journal3Ndfl } from '../../app/otdels/otdels/okp6/Journal3Ndfl/ts/Journal3Ndfl';
import { RealEstateZmIm } from '../../app/otdels/otdels/okp6/RealEstateZmIm/ts/realEstateZmIm';
import { ModelRegistryReference } from 'src/app/otdels/otdels/orn/ReestrReference/ts/addInnFaceRegistryReference';
import { InterrogationOfWitnesses } from '../../app/otdels/otdels/kao/InterrogationOfWitnesses/ts/interrogationOfWitnesses';
import { PrintDocument } from '../../app/otdels/otdels/uz1/PrintDocument/ts/printDocument';
import { DigitalizationDocument } from '../../app/otdels/otdels/registration/DigitalizationDocument/ts/DigitalizationDocument.1';
import { HelpDigitalizationDocument } from '../../app/otdels/otdels/registration/HelpDigitalizationDocument/ts/HelpDigitalizationDocument';
import { ContainerModel } from '../../app/otdels/otdels/registration/ContainerModel/ts/ContainerModel';

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
        path: 'TaxDeclarationFl',
        component: TaxDeclarationFl
      },
      {
        path: 'Journal3Ndfl',
        component: Journal3Ndfl
      },
      {
        path: 'nalog121',
        component: Okp1Journal121
      },
      {
        path: 'easDocument',
        component: EasJournal
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
        component: SalesBookBankUlFace
      },
      {
        path: 'addPatent',
        component: AddPatent
      },
      {
        path: 'patent',
        component: Patent
      },
      {
        path: 'regNp',
        component: ModelRegistrationFace
      },
      {
        path: 'RealEstateZmIm',
        component: RealEstateZmIm
      },
      {
        path: 'registryReference',
        component: ModelRegistryReference
      },
      {

        path: 'InterrogationOfWitnesses',
        component: InterrogationOfWitnesses
      },
      {
        path: 'printDoc',
        component: PrintDocument
      },
      {
        path: 'helpDigitalizationDocument',
        component: HelpDigitalizationDocument
      },
      {
        path: 'digitalizationDocument',
        component: DigitalizationDocument
      },
      {
        path: 'container',
        component: ContainerModel
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
