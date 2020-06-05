import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseProductsView } from 'src/app/shared/models/products/responseProductsView';


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

  getProducts(): Observable<ResponseProductsView> {
    return this.http.get<ResponseProductsView>(this.apiUrl + '/books');
  }

}