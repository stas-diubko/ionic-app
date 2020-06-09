import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ResponseProductsView } from 'src/app/shared/models/products/responseProductsView';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private readonly apiUrl: string;
  cartData = new Subject<[]>();
  cartData$ = this.cartData.asObservable();

  cartLength = new Subject<number>();
  cartLength$ = this.cartLength.asObservable();

  constructor(
      private http: HttpClient,
      private authHelper: AuthHelper
    ) 
    {
        this.apiUrl = environment.apiUrl;
    }
  
  getCartData() {
    let decodedToken = this.authHelper.getToken();
    return this.http.get<any>(this.apiUrl + `/cart/${decodedToken.id}`).subscribe(data => {
      this.cartLength.next(data.data.length);
    })
  } 

  addToCart(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/cart', data);
  }

}