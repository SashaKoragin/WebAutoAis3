import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthIdentification } from '../../../Api/RequestService/requestService';
import { Identification } from '../../../Api/RequestService/modelAutomation';


@Component({
  templateUrl: '../html/security.html',
  styleUrls: ['../css/security.css'],
})

export class Login{

  constructor(public authService: AuthIdentification, public router: Router){}

  
  public IsVisibleButton:boolean = false
  login(){
  try{
        if((this.authService.user.loginField) && (this.authService.user.passwordField)){
          this.authService.login().subscribe((model:Identification) => {
            this.authService.user = model;
            if(!model.isErrorField){
               this.authService.addRule();
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/Auto';
                this.authService.isLoggedIn = true;
                let navigationExtras: NavigationExtras = {
                  queryParamsHandling: 'preserve',
                  preserveFragment: true
              };
              this.authService.IsVisibleButton = true;
              this.router.navigate([redirect], navigationExtras);
              return;
            }
          });
        } else {
             this.authService.user.errorMessageField = 'Не введен Логин/Пароль';
             this.authService.user.isErrorField = true;
             return;
        }
      }catch (e) {
         alert(e);
    };
    }
  }