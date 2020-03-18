import { Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Identification } from './modelAutomation';
import { AdressService } from '../AdressGetPost/adressService';
import { NgxPermissionsService } from 'ngx-permissions';
const url: AdressService = new AdressService();
const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn:'root'
})
export class AuthIdentification {

  constructor(private http: HttpClient,public permissionsService: NgxPermissionsService) { }

  public user:Identification = new Identification();

  public IsVisibleButton:boolean = false
  isLoggedIn = false;
  redirectUrl: string;
///Подключение по средствлом запроса
  login() {
    return this.http.post(url.identificationUser, this.user, httpOptionsJson);
  }

  ///Добавление ролей с сервера
  addRule(){
    try {
      console.log('Подключились к серверу!');
      this.permissionsService.addPermission(this.user.groupRuleServerField);
      console.log(this.user.groupRuleServerField);
      console.log('Подключили роли!');
    } catch (e) {
      alert(e.toString());
    }
  }

  ///Выход из авторизации
  logout(): void {
     this.isLoggedIn = false;
     this.user =  new Identification();
     this.IsVisibleButton = false;
  }

}


