import { Routes } from '@angular/router';
import { CategoriaPageComponent } from './features/pages/categorias/categoria-page/categoria-page.component';
import { LoginComponent } from './features/pages/login/login.component';
import { HomeComponent } from './features/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CozinhaComponent } from './features/pages/cozinha/cozinha.component';

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
  },
  {
    path: 'cozinha',
    component: CozinhaComponent
  },
  {
    path: 'adm',
    loadChildren: () => import('./../app/features/pages/admin/admin.module').then(m => m.AdminModule)
  }

];
