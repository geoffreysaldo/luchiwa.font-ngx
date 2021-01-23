
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
} from '@nebular/theme';
import { AdminRoutingModule } from './admin-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminConnectionComponent } from './components/admin-connection/admin-connection.component';


@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbMenuModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AdminPageComponent,
    AdminConnectionComponent,
  ],

})

export class AdminModule {
}
