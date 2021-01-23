import { Injectable } from '@angular/core';
import {  Resolve } from '@angular/router';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from 'app/models/product.interface';



@Injectable()
export class CategoriesResolver implements Resolve<string[]> {
    public type: string
    constructor(
        private ProductsService: ProductsService){}
    
    resolve(): Observable<string[]>{
        return this.ProductsService.getCategoriesOfType('plats');
    }
}