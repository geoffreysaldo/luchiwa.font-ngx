
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';

import {
  NbAutocompleteModule,
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { ProductsRoutingModule } from './products-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductPageComponent } from './add-product-page/add-product-page.component';
import { ProductsComponent } from './products.component'
import localeFr from '@angular/common/locales/fr';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog.component';
registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbSelectModule,
    NbTabsetModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ProductsComponent,
    ProductPageComponent,
    ProductsListComponent,
    AddProductPageComponent,
    DeleteProductDialogComponent,
    UpdateProductDialogComponent,
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR' // 'de-DE' for Germany, 'fr-FR' for France ...
    }
  ]

})

export class ProductsModule {
}
