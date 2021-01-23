import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductTypeResolver } from 'app/services/product-type.resolver';


const routes: Routes = [
            {
                path: ':type',
                pathMatch: 'full',
                component: ProductPageComponent,
            },
            {
                path: ':type/:category',
                pathMatch: 'full',
                component: ProductPageComponent,
            }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {
}
