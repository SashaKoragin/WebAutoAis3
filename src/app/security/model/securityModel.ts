import { Injectable } from '@angular/core';
import { AuthIdentification} from '../../../Api/RequestService/requestService';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad, Route
} from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AuthInventar implements CanActivate, CanActivateChild, CanLoad {


  constructor( public authService: AuthIdentification, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
}

canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
}

canLoad(route: Route): boolean {

    let url = `/${route.path}`;
    console.log(url);
    return this.checkLogin(url);
}

checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
     this.authService.redirectUrl = url;
     this.router.navigate(['/Login']);
     return false;
}

}
