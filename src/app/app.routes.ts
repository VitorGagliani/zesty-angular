import { Routes } from '@angular/router';
import { CategoriaPageComponent } from './features/categorias/categoria-page/categoria-page.component';

export const routes: Routes = [
  {
    path: 'categoria/:id',
    component: CategoriaPageComponent
  }
];
