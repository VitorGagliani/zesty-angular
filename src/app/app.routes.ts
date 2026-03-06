import { Routes } from '@angular/router';
import { CategoriaPageComponent } from './features/pages/categorias/categoria-page/categoria-page.component';
import { LoginComponent } from './features/pages/login/login.component';
import { HomeComponent } from './features/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent
  },
  {
    path: 'menu/:mesa/:pedido',
    component: HeaderComponent,
      children: [
      {
        path: '',
        component: CategoriaPageComponent
      },
      {
        path: 'categoria/:categoriaId',
        component: CategoriaPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }

];
