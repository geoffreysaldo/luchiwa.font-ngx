import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbAlertModule,
} from '@nebular/theme';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AccountCheckPageComponent } from './components/account-check-page/account-check-page.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbMenuModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AuthPageComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    AccountCheckPageComponent,
    UpdatePasswordComponent,
    ProfileComponent,
  ]
})

export class AuthModule {
}
