import { Injectable, resolveForwardRef } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from 'app/models/product.interface';
import { ActivatedRoute } from "@angular/router";
import { take } from 'rxjs/operators';


@Injectable()
export class ProductTypeResolver implements Resolve<Product[]> {
    public type: string
    constructor(
        private ProductsService: ProductsService){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Product[]>{
        return this.ProductsService.getProductsByType(route.paramMap.get("type"));
    }
}