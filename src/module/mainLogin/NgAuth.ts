import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from '../../app/security/ts/security';
import { AuthRoutingModule } from './RoutingAuth';
import { AngularMaterialModule } from '../materialModule/matrialModule';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';
import { ServerHost } from '../../Api/AdressGetPost/adressService';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.logging = true;
  c.url = `http://${ServerHost}:8060/signalr/hubs`;  //http://localhost:8060/signalr
  return c;
}

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule,
    SignalRModule.forRoot(createConfig),
  ]
})
export class AuthModule { }
