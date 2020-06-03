import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Array<{}>;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    console.log('test');
    this.productService.getProducts().subscribe(data => {
      console.log(data.data);
      
      this.products = data.data;
    })
  }

}
