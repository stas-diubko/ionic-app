import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly apiUrl: string;

  constructor(
      private http: HttpClient
    ) 
    {
        this.apiUrl = environment.apiUrl;
    }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/books')
  }

}