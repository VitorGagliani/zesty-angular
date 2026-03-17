import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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
      route: 'dashboard',
    },
    {
      label: 'Categorias',
      icon: 'category',
      route: 'categorias',
    },
    {
      label: 'Produtos',
      icon: 'restaurant',
      route: 'produtos',
    },
    {
      label: 'Mesas',
      icon: 'weekend',
      route: 'mesas',
    },
  ];

  pageTitle = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data['title'];
        })
      )
      .subscribe(title => {
        this.pageTitle = title || '';
      });
  }


}
