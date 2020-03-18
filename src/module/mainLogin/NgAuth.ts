import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from '../../app/security/ts/security';
import { AuthRoutingModule } from './RoutingAuth';
import { AngularMaterialModule } from '../materialModule/matrialModule';

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule
  ]
})
export class AuthModule { }
