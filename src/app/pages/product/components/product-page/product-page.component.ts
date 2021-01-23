import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/product.interface';
import { ProductsService } from 'app/services/products.service';

const titleHashMap = {
  ['entrees']: 'Entrées',
  ['plats']: 'Plats',
  ['california']: 'California rolls',
  ['spring']: 'Spring rolls'
}

@Component({
  selector: 'ngx-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public products: any[];
  public type: string;
  public category: string;

  constructor(    
    private route: ActivatedRoute,
    private productsService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = titleHashMap[params.type];
      if(!params.category){
        this.productsService.getProductsByType(params.type).subscribe((products) => {
          this.products = products;
        },
        (err) => {

        })
      } else {
        this.category = titleHashMap[params.category];
        this.productsService.getProductsByCategory(params.category).subscribe((products) => {
          this.products = products;
        },
        (err) => {

        })
      }
    })
  }

}
