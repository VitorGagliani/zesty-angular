import {
  Categoria,
  CategoriaService,
} from './../../../../../core/services/categoria.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCadastroComponent } from '../../../../../components/shared/dialog-cadastro/dialog-cadastro.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    DialogCadastroComponent,
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit {
  private categoriaService = inject(CategoriaService);

  categoria: Categoria[] = [];

  constructor(private dialog: MatDialog) {}


  //função para carregar a grid
  private carregarGrid() {
    this.categoriaService.listar().subscribe((categoria) => {
      this.categoria = categoria;
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
      this.categoriaService.criarCategoria(result).subscribe(() => {
        this.carregarGrid();
      });
    }
  });
}

    abrirDialogEditar(categoria: Categoria) {
      const dialogRef = this.dialog.open(DialogCadastroComponent, {
        width: '800px',
        data: {
          titulo: 'Editar categoria',
          botao: 'Salvar',
          categoria: categoria,
        },
      });
      //se teve retorno, chama a api e recarrega a grid
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.categoriaService.editarCategoria(result).subscribe(() => {
            this.carregarGrid();
          });
        }
      });
    }

deletarCategoria(id: number) {
  this.categoriaService.excluirCategoria(id).subscribe({
    next: () => {
      this.carregarGrid();
    },
    error: (err) => {
      alert(err.error);
    }
  });
}

}
