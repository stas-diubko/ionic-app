import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<{}>;
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) { }

  addToCard(event) {
    console.log(event.currentTarget.id);
    
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.data;
    })
    this.userService.getUserData();
  }

}
