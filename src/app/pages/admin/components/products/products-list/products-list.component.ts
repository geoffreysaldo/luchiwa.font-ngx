import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/models/product.interface';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'ngx-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public products: any[];
  public id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService) {
      if(this.router.getCurrentNavigation()) {
        if(this.router.getCurrentNavigation().extras.state){
          this.id = this.router.getCurrentNavigation().extras.state.id;
        };
      } else {
        this.id = null;
      }
     }

  ngOnInit(): void {
    console.log(this.id)
    if(!this.id){
      this.route.data.subscribe((data: { products: Product[], type: string }) => {
        this.products = data.products;
      });
    } else {
      this.productsService.getProductsByType(this.route.snapshot.paramMap.get("type")).subscribe((products) => {
        this.products = products;
        this.products = this.products.filter((product) => product._id !== this.id);
      })
    }
  }

}
