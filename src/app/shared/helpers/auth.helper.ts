import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ResponseLoginView } from '../models/authentication/responseLoginView';

@Injectable({
    providedIn: 'root'
})

export class AuthHelper {
    public isLogin = new BehaviorSubject<boolean>(false);
    isLogin$ = this.isLogin.asObservable();
  
    private _token = new Subject<any>();
    token$ = this._token.asObservable();

    constructor(
      public router: Router
    ){

    }

    getToken () {
        let token = localStorage.getItem('token')
        if (token) {
          const decoded = jwt_decode(token);
          this._token.next(decoded);
          this.isLogin.next(true);
          return decoded;
        } else {
          this.isLogin.next(false);
        }
    }

    setIsLogin(isLogin: boolean): void {
      this.isLogin.next(isLogin);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        this.isLogin.next(!!token);
        return !!token;
    }

    setLoginData(data:ResponseLoginView): void {
      localStorage.setItem('token', `${data.token}`);
      localStorage.setItem('refreshToken', `${data.refreshToken}`);
    }
}