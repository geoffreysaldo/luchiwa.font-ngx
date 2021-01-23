import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminConnectionComponent } from './components/admin-connection/admin-connection.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: AdminPageComponent,
  children:[
      {
        path: 'connexion',
        component: AdminConnectionComponent,
      },
      {
        path: 'produits',
        loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)
        //component: ProductsListComponent,
      }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
  ]
})
export class AdminRoutingModule {
}
