import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/models/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient,
    ) { }

    getProductById(id: string): Observable<Product>{
      return this.httpClient.get<Product>("http://localhost:3000/product/id/" + id);
    }

    getProductsByType(type: string): Observable<Product[]> {
      return this.httpClient.get<Product[]>("http://localhost:3000/product/type/" + type);
    }

    getCategories(): Observable<any> {
      return this.httpClient.get<any>("http://localhost:3000/product/categories/");
    }

    getProductsByCategory(category: string): Observable<any> {
      return this.httpClient.get<any>("http://localhost:3000/product/category/" + category);
    }

    getCategoriesOfType(type: string): Observable<any> {
      return this.httpClient.get<any>("http://localhost:3000/product/categories/" + type);
    }

    addProduct(product: Product): Observable<any> {
      return this.httpClient.post<any>("http://localhost:3000/product", product)
    }

    updateProduct(product): Observable<any> {
      return this.httpClient.put<any>("http://localhost:3000/product/", product)
    }

    deleteProduct(id: string): Observable<void> {
      return this.httpClient.delete<void>("http://localhost:3000/product/" + id);
    }
}
