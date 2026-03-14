import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  menuItems = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: 'dashboard'
  },
  {
    label: 'Categorias',
    icon: 'category',
    route: 'categorias'
  },
  {
    label: 'Produtos',
    icon: 'restaurant',
    route: 'produtos'
  },
  {
    label: 'Mesas',
    icon: 'weekend',
    route: 'mesas'
  }
];
}
