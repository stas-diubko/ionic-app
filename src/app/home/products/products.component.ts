import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';
import { CartService } from 'src/app/core/services/cart.service';
import { Toast } from 'src/app/shared/toast/toast';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<{}>;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authHelper: AuthHelper,
    private cartService: CartService,
    private toast: Toast
  ) { }

  addToCard(event) {
    let decodedToken = this.authHelper.getToken();
    let cartDataToAdd = {
      userId: decodedToken.id,
      bookId: event.currentTarget.id
    }
    this.cartService.addToCart(cartDataToAdd).subscribe(async data => {
      this.toast.open(data.message);
    })

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
    })
    this.userService.getUserData();
    this.cartService.getCartData();
  }

}
