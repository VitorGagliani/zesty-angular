import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import path from 'path';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { MesasComponent } from './pages/mesas/mesas.component';
import { title } from 'process';
import { CadastroComponent } from './pages/produtos/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {title: 'Dashboard'}
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {title: 'Dashboard'}
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
        data: {title: 'Categorias'}
      },
      {
        path: 'produtos',
        component: ProdutosComponent,
        data: {title: 'Produtos'}
      },
      {
        path: 'produtos/novo-produto',
        component: CadastroComponent,
        data: {title: 'Cadastro Produto'}
      },
      {
        path: 'mesas',
        component: MesasComponent,
        data: {title: 'Mesas'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
