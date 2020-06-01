import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { ChildNgRoutingAutoModule } from './childNgRoutingModule';
import { AngularMaterialModule } from '../materialModule/matrialModule';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/ts/viewOkp2';
import { Select } from '../../Api/ModelSelectView/View/SelectView';
import { ModelPreCheck } from '../../app/otdels/otdels/PreCheck/ts/wiewPreCheck';
import { DatabaseAutoUl } from '../../app/otdels/otdels/dataBaseUl/ts/databaseAutoUl';
import { ModelDialogTemplateDataBase, FilterParametrs } from '../../app/otdels/otdels/dataBaseUl/templateModelDb/templateTableModelTs/templateTableModel';
import { ModelSqlTable } from '../../Api/ModelSelectTable/View/modelSelectTable';


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
    MainChildOtdel,ModelOkp2,Select,ModelPreCheck,DatabaseAutoUl,ModelDialogTemplateDataBase,ModelSqlTable,FilterParametrs
  ]


})

export class ChildNgAutoModule { }
