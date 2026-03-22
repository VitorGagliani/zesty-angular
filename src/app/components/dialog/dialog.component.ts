import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComandaService } from '../../core/services/comanda.service';
import { MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  idPedido: number;
  mesa: number;
  idProduto: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})



export class DialogComponent {

  private comanda = inject(ComandaService);
  data: DialogData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DialogComponent>);

  form = new FormGroup({
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
    observacao: new FormControl(''),
  });

  postarComanda() {
    const comanda = {
      idPedido: this.data.idPedido!,
      mesa: this.data.mesa!,
      idProduto: this.data.idProduto!,
      quantidade: this.form.value.quantidade!,
      observacao: this.form.value.observacao!,
    };
    console.log(comanda);

    this.comanda.criarPedido(comanda).subscribe({
      next: (res) => {
        console.log("Pedido feito");
      },
      error: (err)=>{
        console.error(err);

      }
    })

    this.dialogRef.close();

  }

}
