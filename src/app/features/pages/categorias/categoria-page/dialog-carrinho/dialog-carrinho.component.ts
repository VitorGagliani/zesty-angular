import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoService } from '../../../../../core/services/pedido.service';

interface DialogData {
  idPedido: number;
}

@Component({
  selector: 'app-dialog-carrinho',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './dialog-carrinho.component.html',
  styleUrl: './dialog-carrinho.component.scss',
})
export class DialogCarrinhoComponent implements OnInit {
  data: DialogData = inject(MAT_DIALOG_DATA);
  pedidoService = inject(PedidoService);
  dialogRef = inject(MatDialogRef<DialogCarrinhoComponent>);

  produto: any[] = [];
  total = 0;

  ngOnInit() {
    const idPedido = this.data.idPedido;


    this.pedidoService.listarCarrinho(idPedido).subscribe({
      next: (res) => {
        // se backend retornar {itens:[], total:...}
        if (res.itens) {
          this.produto = res.itens;
        } else {
          // fallback se retornar só array
          this.produto = res;
        }

        this.calcularTotal();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  calcularTotal() {
    this.total = this.produto.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0,
    );
  }

  removerItem(item: any) {
    this.produto = this.produto.filter((i) => i !== item);

    this.calcularTotal();
  }

  enviarPedido() {
    console.log('Pedido enviado', this.produto);

    // aqui depois você chama endpoint da cozinha

    this.dialogRef.close();
  }
}
