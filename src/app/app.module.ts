/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthService } from './services/auth.service';
import { UserInterceptorService } from './services/user-interceptor.service';
import { ProductTypeResolver } from './services/product-type.resolver';
import { ProductIdResolver } from './services/product-id.resolver';
import { CategoriesResolver } from './services/categories.resolver';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './store/shopping-list/shopping-list.reducer';
import { ProductModule } from './pages/product/product.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,

    /*NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),*/
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
  ],
  providers: [
    AuthService,
    ProductTypeResolver,
    ProductIdResolver,
    CategoriesResolver,
    {provide:HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
