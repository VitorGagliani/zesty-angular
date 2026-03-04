import { Component, inject } from '@angular/core';
import { Mesa, MesaService } from '../../../core/services/mesa.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private mesaService = inject(MesaService);
  constructor(private router: Router){}

irParaLogin(idMesa: number){
  this.router.navigate(['/login'], { queryParams: { mesa: idMesa } });
}
  mesas: Mesa[] = [];

  ngOnInit(): void {
    this.mesaService.listar().subscribe({
      next: (data) => {
        console.log('Mesas recebidas:', data);
        this.mesas = data;
      },
      error: (err) => console.error(err),
    });
  }
}
