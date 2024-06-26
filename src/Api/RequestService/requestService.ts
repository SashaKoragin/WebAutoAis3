import { Injectable } from '@angular/core';
import { SignalR, ISignalRConnection, IConnectionOptions, ConnectionStatus, BroadcastEventListener } from 'ng2-signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identification } from './modelAutomation';
import { AdressService, ServerHost } from '../AdressGetPost/adressService';
import { NgxPermissionsService } from 'ngx-permissions';
import { NavigationExtras, Router } from '@angular/router';
const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthIdentification {

  constructor(private http: HttpClient, public router: Router, public permissionsService: NgxPermissionsService) { }

  public user: Identification = new Identification();

  public IsVisibleButton: boolean = false
  isLoggedIn = false;
  redirectUrl: string;
  ///Подключение по средствлом запроса
  login() {
    return this.http.post(url.identificationUser, this.user, httpOptionsJson);
  }

  ///Добавление ролей с сервера
  addRule() {
    try {
      console.log('Подключились к серверу!');
      this.permissionsService.addPermission(this.user.groupRuleServerField);
      console.log('Подключили роли!');
    } catch (e) {
      alert(e.toString());
    }
  }

  ///Выход из авторизации
  logout(): void {
    this.isLoggedIn = false;
    this.user = new Identification();
    this.IsVisibleButton = false;
    this.permissionsService.flushPermissions()
  }

  ///Потеря контекста с сайтом
  logoutDisconnect(): void {
    this.isLoggedIn = false;
    this.IsVisibleButton = false;
    this.user = new Identification();
    let redirect = '/Login';
    console.log("Перенаправили на страницу: " + redirect)
    let navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    this.router.navigate([redirect], navigationExtras);
  }
}


@Injectable({
  providedIn: 'root'
})

export class AuthIdentificationSignalR {

  constructor(private http: HttpClient, public signalR: SignalR) { }

  public iduser: string = null;
  //Подписка
  public subscribeDisconnected: any = null;
  public connect: ISignalRConnection = null;
  public status: ConnectionStatus = null;
  public error: any = null;
  public autorization: AuthIdentification = null;

  createConnection(autorizationUsers: AuthIdentification) {
    try {
      this.autorization = autorizationUsers;
      var options: IConnectionOptions =
      {
        hubName: 'HubAutomation',
        qs: { userName: autorizationUsers.user.nameField, tabelNumbers: autorizationUsers.user.loginField },
        url: `http://${ServerHost}:8060/signalr`,
        executeErrorsInZone: true,
        executeEventsInZone: true,
        executeStatusChangeInZone: true
        //Можно задать ping интервал
      }
      this.connect = this.signalR.createConnection(options);
      this.statusSubscribeSignalR();
    } catch (e) {
      alert(e.toString());
    }
  }


  //Запуск подписи на событие
  async startServerSignalR() {
    if (this.status === null) {
      await this.connect.start();
      this.iduser = this.connect.id
    }
    this.subscribeDisconnected = new BroadcastEventListener<string>('Disconnected');
    this.connect.listen(this.subscribeDisconnected);
    this.subscribeDisconnected.subscribe((substring: string) => {
      alert(substring);
      this.stopServerSignalR();
      this.autorization.logoutDisconnect();
    });
    console.log('Запустили сервер!');

    console.log('Подписались на статус соединения!');
  }

  stopServerSignalR() {
    console.log('Отключили роли!');
    if (new Array('connected', 'disconnected').some(x => x === this.status.name)) {
      console.log('Остановили сервер!');
      console.log('Отписались от статуса соединения!');
      this.connect.stop();
      this.iduser = null;
      this.status = null;
    }
  }

  private statusSubscribeSignalR() {
    this.connect.errors.subscribe((error: any) => {
      this.error = error;
      console.log(this.status + " And " + this.error);
    });
    this.connect.status.subscribe((state: ConnectionStatus) => {
      this.status = state;
      console.log(this.status + " And " + this.error);
      if (state.name === "disconnected") {
        this.stopServerSignalR();
        this.autorization.logoutDisconnect();
        alert("Потеря соединения с сайтом Обновите страницу!!!");
      }
    });
  }
}
