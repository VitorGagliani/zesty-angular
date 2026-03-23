import { Component, OnInit, inject } from '@angular/core';
import {
  Produto,
  ProdutoService,
} from './../../../../../core/services/produto.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCadastroComponent } from '../../../../../components/shared/dialog-cadastro/dialog-cadastro.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    DialogCadastroComponent,
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss',
})
export class ProdutosComponent {
  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  produtos: Produto[] = [];

  constructor(private dialog: MatDialog) {}

  //função para carregar a grid
  private carregarGrid() {
    this.produtoService.listarTodos().subscribe((produto) => {
      this.produtos = produto;
    });
  }

  //aqui to chamando a função para quando carregar a pagina, ja carregar a função
  ngOnInit() {
    this.carregarGrid();
  }

  abrirCadastro() {
    this.router.navigate(['adm/produtos/novo-produto'])
  }
  /*

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
   */
}
