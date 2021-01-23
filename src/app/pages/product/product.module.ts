import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbAlertModule,
  NbIconModule,
  NbPopoverModule,
} from '@nebular/theme';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  imports: [
    ProductRoutingModule,
    ThemeModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbMenuModule,
    NbPopoverModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ProductPageComponent,
    ProductCardComponent,]
})

export class ProductModule {
}
