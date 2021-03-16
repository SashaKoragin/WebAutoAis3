import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from '../../app/security/ts/security';
import { AuthRoutingModule } from './RoutingAuth';
import { AngularMaterialModule } from '../materialModule/matrialModule';
import { ServerHost } from '../../Api/AdressGetPost/adressService';
import { SignalRConfiguration, SignalRModule } from 'ng2-signalr';
import { AuthIdentificationSignalR } from '../../Api/RequestService/requestService';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.logging = true;
  c.url = `http://${ServerHost}:8059/signalr`;
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
  ],
  providers:[AuthIdentificationSignalR]
})
export class AuthModule { }
