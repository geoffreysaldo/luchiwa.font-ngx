import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
    },
    {
        path: ':id',
        component: HeaderComponent,
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ThemeRoutingModule {
}
