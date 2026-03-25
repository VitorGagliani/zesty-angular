import { Mesa, MesaService } from './../../../../../core/services/mesa.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCadastroComponent } from '../../../../../components/shared/dialog-cadastro/dialog-cadastro.component';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    DialogCadastroComponent,
  ],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.scss',
})
export class MesasComponent {
   private mesaService = inject(MesaService);

    mesa: Mesa[] = [];

    constructor(private dialog: MatDialog) {}


    //função para carregar a grid
     carregarGrid() {
      this.mesaService.listar().subscribe((mesa) => {
        this.mesa = mesa;
      });
    }

    //aqui to chamando a função para quando carregar a pagina, ja carregar a função
    ngOnInit() {
      this.carregarGrid();
    }

  abrirDialog() {
    const dialogRef = this.dialog.open(DialogCadastroComponent, {
      width: '800px',
      data: {
        titulo: 'Cadastrar categoria',
        botao: 'Adicionar',
      },
    });
  //se teve retorno, chama a api e recarrega a grid
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mesaService.criarMesa(result).subscribe(() => {
          this.carregarGrid();
        });
      }
    });
  }

      abrirDialogEditar(mesa: Mesa) {
        const dialogRef = this.dialog.open(DialogCadastroComponent, {
          width: '800px',
          data: {
            titulo: 'Editar mesa',
            botao: 'Salvar',
            mesa: mesa,
          },
        });
        //se teve retorno, chama a api e recarrega a grid
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.mesaService.editarMesa(result).subscribe(() => {
              this.carregarGrid();
            });
          }
        });
      }

  deletarMesa(id: number) {
    this.mesaService.excluirMesa(id).subscribe({
      next: () => {
        this.carregarGrid();
      },
      error: (err) => {
        alert(err.error);
      }
    });
  }

}
