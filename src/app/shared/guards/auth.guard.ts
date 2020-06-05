import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHelper } from '../helpers/auth.helper';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authHelper: AuthHelper,

    ) { }

    async canActivate(route: ActivatedRouteSnapshot) {
        let isAuthenticated: boolean = this.authHelper.isAuthenticated()
        if (isAuthenticated) {
            return true;
        }
        this.router.navigate(['auth', 'login'], { replaceUrl: true });
        return false;
    }
}
