import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AccountCheckPageComponent } from './components/account-check-page/account-check-page.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileResolver } from '../auth/services/profile.resolver';

const routes: Routes = [{
  path: '',
  component: AuthPageComponent,
  children:[
      {
        path: 'connexion',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'inscription',
        pathMatch: 'full',
        component: SignUpComponent,
      },
      {
        path: 'oubliemdp',
        pathMatch: 'full',
        component: ForgetPasswordComponent,
      },
      {
        path: 'validation/:token',
        pathMatch: 'full',
        component: AccountCheckPageComponent,
      },
      {
        path: 'updatepassword/:token',
        pathMatch: 'full',
        component: UpdatePasswordComponent,
      },
      {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
        resolve: {
            userInfo: ProfileResolver
        }
      }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
