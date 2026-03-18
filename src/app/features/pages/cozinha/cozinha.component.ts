import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Grid, PedidoService } from '../../../core/services/pedido.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';
import { Mesa, MesaService } from '../../../core/services/mesa.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-cozinha',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    ScrollingModule,
  ],
  templateUrl: './cozinha.component.html',
  styleUrl: './cozinha.component.scss',
})
export class CozinhaComponent implements OnInit {
  private pedidoSerivce = inject(PedidoService);
  private mesaSerice = inject(MesaService)
  grids: Grid[] = [];
  mesas: Mesa[] = [];

//recarrega grid quando chamo ao atualizar status

  atualizar() {
  this.pedidoSerivce.listarCozinha().subscribe((grids) => {
    this.grids = grids;
  });
}

  mudarStatus(id: number, status: string) {
  if (status === 'PREPARO') {
    this.pedidoSerivce.prepararComanda(id).subscribe({
      next: () => {
        console.log('Comanda enviada para preparo');
        this.atualizar();
      },
      error: (err) => {
        console.error('Erro ao preparar comanda', err);
      },
    });
  }

  if (status === 'PRONTO') {
    this.pedidoSerivce.fecharComanda(id).subscribe({
      next: () => {
        console.log('Comanda fechada');
        this.atualizar();
      },
      error: (err) => {
        console.error('Erro ao preparar comanda', err);
      },
    });
  }
}

  getStatusLabel(status: string): string {
    switch (status) {
      case 'ABERTO':
        return 'Aberto';

      case 'EmPreparo':
        return 'Preparando';

      case 'PRONTO':
        return 'Pronto';

      default:
        return status;
    }
  }

  ngOnInit(): void {
    this.pedidoSerivce.listarCozinha().subscribe((grids) => {
      this.grids = grids;
    });
    this.mesaSerice.listar().subscribe((mesas) => {
      this.mesas = mesas;
    });
  }
}
