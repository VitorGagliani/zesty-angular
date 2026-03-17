import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../../../app/core/services/produto.service';
import { switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { DialogCarrinhoComponent } from './dialog-carrinho/dialog-carrinho.component';
import { PedidoSessionService } from '../../../../core/services/pedido-session.service';

@Component({
  selector: 'app-categoria-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.scss'],
})
export class CategoriaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private dialog = inject(MatDialog);
  private session = inject(PedidoSessionService);

  produtos: any[] = [];
  pedidoId!: number;
  mesa!: number;

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((params) => {
      this.mesa = Number(params.get('mesa'));
      this.pedidoId = Number(params.get('pedido'));

      this.session.mesa = this.mesa;
      this.session.pedidoId = this.pedidoId;


    });

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const categoriaId = Number(params.get('categoriaId'));
          return this.produtoService.listar(categoriaId);
        }),
      )
      .subscribe((data) => {
        this.produtos = data;
      });
  }

  openDialog(produto: any) {
    this.dialog.open(DialogComponent, {
      data: {
        idPedido: this.pedidoId,
        mesa: this.mesa,
        idProduto: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        descricao: produto.descricao,
        imagem: produto.imagem,
      },
      width: '520px',
    });
  }

  abrirCarrinho() {
    this.dialog.open(DialogCarrinhoComponent, {
      width: '500px',
      data: {
        idPedido: this.pedidoId,
      },
    });
  }
}
