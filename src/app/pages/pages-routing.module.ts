import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CategoriesResolver } from 'app/services/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    resolve: {
      categories: CategoriesResolver
    },
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'produits',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
    ]
  }
  ,
  {
      path:'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
