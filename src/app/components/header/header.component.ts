import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Categoria,
  CategoriaService,
} from '../../core/services/categoria.service';
import { RouterModule } from '@angular/router';
import { DialogCarrinhoComponent } from '../../../app/features/pages/categorias/categoria-page/dialog-carrinho/dialog-carrinho.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PedidoSessionService } from '../../core/services/pedido-session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private session = inject(PedidoSessionService);

  categorias: Categoria[] = [];
  pedidoId!: number;

  ngOnInit(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => {
        console.log('Categorias recebidas:', data);
        this.categorias = data;
      },
      error: (err) => console.error(err),
    });
    this.route.queryParams.subscribe((params) => {
      this.pedidoId = Number(params['pedido']);
    });
  }

  abrirCarrinho() {
    this.dialog.open(DialogCarrinhoComponent, {
      width: '500px',
      data: {
        idPedido: this.session.pedidoId,
      },
    });
  }
}
