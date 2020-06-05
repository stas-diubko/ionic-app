//Vendors
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ResponseLoginView } from 'src/app/shared/models/authentication/responseLoginView';
import { RequestLoginView } from 'src/app/shared/models/authentication/requestLoginView';
import { RequestRegisterView } from 'src/app/shared/models/authentication/requestRegisterView';
import { ResponseRegisterView } from 'src/app/shared/models/authentication/responseRegisterView';
import { LoginDataView } from 'src/app/shared/models/authentication/loginDataView';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private apiUrl: string;
  private loginData = new Subject<LoginDataView>();
  register$ = this.loginData;

  constructor(
    private http: HttpClient,
    private authHelper: AuthHelper,
    private router: Router,
    ) {
    this.apiUrl = environment.apiUrl;
  }

  setLoginState(loginData: LoginDataView) {
    this.loginData.next(loginData);
  }

  login(model: RequestLoginView): Observable<ResponseLoginView> {
    return this.http.post<ResponseLoginView>(this.apiUrl + "/login", model);
  }

  register(data: RequestRegisterView): Observable<ResponseRegisterView> {
    return this.http.post<ResponseRegisterView>(this.apiUrl + "/users/register", data);
  }

  
  onLogOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.authHelper.isAuthenticated();
    this.router.navigateByUrl('/home/products');
  }

  refreshToken(refreshToken: string): Observable<ResponseLoginView> {
    let body = {
      refreshToken
    }
    return this.http.post<ResponseLoginView>(`${this.apiUrl}/login/refreshToken`, body)
  }

}