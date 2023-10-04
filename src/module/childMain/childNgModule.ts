import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { ChildNgRoutingAutoModule } from './childNgRoutingModule';
import { AngularMaterialModule } from '../materialModule/matrialModule';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Select } from '../../Api/ModelSelectView/View/SelectView';
import { DatabaseAutoUl } from '../../app/otdels/otdels/dataBaseUl/ts/databaseAutoUl';
import { ModelDialogTemplateDataBase, FilterParametrs } from '../../app/otdels/otdels/dataBaseUl/templateModelDb/templateTableModelTs/templateTableModel';
import { ModelSqlTable } from '../../Api/ModelSelectTable/View/modelSelectTable';
import { ModelRaschetBudgPayment } from '../../app/otdels/otdels/raschetBudg/ts/viewRaschetBudg';
import { ModelPreCheck } from 'src/app/otdels/otdels/PreCheck/ModelAdd/ts/wiewPreCheck';
import { JournalPreCheck } from '../../app/otdels/otdels/PreCheck/Journal129/ts/Journal129';
import { ExpandeTableStatement } from '../../app/otdels/otdels/dataBaseUl/templateModelExpandedDb/templateModelExpandedDbTs/templateModelExpandedDb';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/Journal121and129/ts/viewOkp2';
import { SignatureOkp2 } from '../../app/otdels/otdels/okp2/SignatureRuk/ts/signatureOkp2';
import { IdentytiFaceOkp5 } from '../../app/otdels/otdels/okp5/identityFace/ts/viewIdentytiFaceOkp5';
import { AddIdentityFace } from '../../app/otdels/otdels/okp5/addIdentityFace/ts/addIdentityFace';
import { ModelDialogSelectYear } from '../../app/otdels/otdels/dataBaseUl/ts/dialogSelectYear/dialogYearTs/dialogSelectYear';
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
import { ModelRegistryReference } from '../../app/otdels/otdels/orn/ReestrReference/ts/addInnFaceRegistryReference';
import { InterrogationOfWitnesses } from '../../app/otdels/otdels/kao/InterrogationOfWitnesses/ts/interrogationOfWitnesses';
import { UploadFileToServerReport } from '../../Api/UploadFileToServerReport/View/UploadFileToServerReport';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    ChildNgRoutingAutoModule,
    NgxPermissionsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainChildOtdel, ModelOkp2, Select, SignatureOkp2,
    ModelPreCheck, DatabaseAutoUl,
    ModelDialogTemplateDataBase, ModelSqlTable,
    FilterParametrs, ModelRaschetBudgPayment,
    JournalPreCheck, ExpandeTableStatement, IdentytiFaceOkp5, AddIdentityFace, ModelDialogSelectYear, Sales, DeliveryDocument, SalesBookBankUlFace, AddPatent, Patent, Okp1Journal121,
    ModelRegistrationFace, EasJournal, TaxDeclarationFl, Journal3Ndfl, RealEstateZmIm, ModelRegistryReference, InterrogationOfWitnesses, UploadFileToServerReport
  ]


})

export class ChildNgAutoModule { }
