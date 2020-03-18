import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainComponent} from "../../app/main/ts/main"
import { AppRoutingModule } from './routingMain';
import { AuthModule } from '../mainLogin/NgAuth';

import { NgxPermissionsModule } from 'ngx-permissions';
import { AngularMaterialModule } from '../materialModule/matrialModule';


@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AngularMaterialModule
  ],
  declarations: [
    MainComponent
  ],
  bootstrap: [MainComponent],

})
export class AppModule { }
