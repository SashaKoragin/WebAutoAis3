import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MainChildOtdel } from '../../app/otdels/mainChild/ts/mainChild';
import { ChildNgRoutingAutoModule } from './childNgRoutingModule';
import { AngularMaterialModule } from '../materialModule/matrialModule';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ModelOkp2 } from '../../app/otdels/otdels/okp2/ts/viewOkp2';
import { Select } from '../../Api/ModelSelectView/View/SelectView';

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
    MainChildOtdel,ModelOkp2,Select
  ]


})

export class ChildNgAutoModule { }
