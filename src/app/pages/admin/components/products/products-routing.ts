import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { ProductTypeResolver } from 'app/services/product-type.resolver';
import { ProductsComponent } from './products.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductIdResolver } from 'app/services/product-id.resolver';
import { AuthGuard } from '../../services/auth-guard.service';

const routes: Routes = [{
    path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'nouveau',
            component: AddProductPageComponent,
            pathMatch: 'full',
        },
        {
            path: ':type',
            component: ProductsListComponent,
            pathMatch: 'full',
            resolve: {
                products: ProductTypeResolver
            },
        },
        {
            path: ':type/:id',
            component: ProductPageComponent,
            pathMatch: 'full',
            resolve: {
                product: ProductIdResolver
            },
        },

        ]
    }   
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
