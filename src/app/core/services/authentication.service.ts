//Vendors
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  login(model: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "login", model);
  }

  register(data: any): Observable<any> {
      
    return this.http.post<any>(this.apiUrl + "/users/register", data);
  }

}