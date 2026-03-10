import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoService } from '../../../../../core/services/pedido.service';


@Component({
  selector: 'app-dialog-carrinho',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './dialog-carrinho.component.html',
  styleUrl: './dialog-carrinho.component.scss',
})
export class DialogCarrinhoComponent implements OnInit {

  data = inject(MAT_DIALOG_DATA);
  pedidoService = inject(PedidoService);
  dialogRef = inject(MatDialogRef<DialogCarrinhoComponent>);

  itens: any[] = [];
  total = 0;



  ngOnInit() {

    const idPedido = this.data.idPedido;

    this.pedidoService.listarCarrinho(idPedido).subscribe({
      next: (res) => {

        // se backend retornar {itens:[], total:...}
        if (res.itens) {
          this.itens = res.itens;
        } else {
          // fallback se retornar só array
          this.itens = res;
        }

        this.calcularTotal();

      },
      error: (err) => {
        console.error(err);
      },
    });

  }

  calcularTotal() {
    this.total = this.itens.reduce(
      (acc, item) => acc + (item.preco * item.quantidade),
      0
    );
  }

  removerItem(item: any) {

    this.itens = this.itens.filter(i => i !== item);

    this.calcularTotal();

  }

  enviarPedido() {

    console.log('Pedido enviado', this.itens);

    // aqui depois você chama endpoint da cozinha

    this.dialogRef.close();

  }

}
