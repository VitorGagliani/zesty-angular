import { Routes } from '@angular/router';
import { CategoriaPageComponent } from './features/pages/categorias/categoria-page/categoria-page.component';
import { LoginComponent } from './features/pages/login/login.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent
  },
  {
    path: 'categoria/:id',
    component: CategoriaPageComponent
  },
  {
    path: ':login',
    component: LoginComponent
  }
];
