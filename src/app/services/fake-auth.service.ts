import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FakeAuthService implements CanActivate {


  constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('isLoggedin') == "true"){
            this.router.navigate(['user']);
            return false;
        } else {
            this.router.navigate(['login']);
            return true;
        }
    }

}
