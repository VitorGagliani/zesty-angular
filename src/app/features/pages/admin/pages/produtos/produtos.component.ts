import { Component, OnInit, inject } from '@angular/core';
import {
  Produto,
  ProdutoService,
} from './../../../../../core/services/produto.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, CadastroComponent],
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
  carregarGrid() {
    this.produtoService.listarTodos().subscribe((produto) => {
      this.produtos = produto;
    });
  }

  //aqui to chamando a função para quando carregar a pagina, ja carregar a função
  ngOnInit() {
    this.carregarGrid();
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '800px',
      data: {
        titulo: 'Cadastrar produto',
        botao: 'Adicionar',
      },
    });
    //se teve retorno, chama a api e recarrega a grid
    dialogRef.afterClosed().subscribe(() => {
      this.carregarGrid();
    });
  }

  abrirDialogEditar(produto: Produto) {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '800px',
      data: {
        titulo: 'Editar produto',
        botao: 'Salvar',
        produto: produto,
      },
    });
    //se teve retorno, chama a api e recarrega a grid
    dialogRef.afterClosed().subscribe(() => {
      //
      //
      this.carregarGrid();
    });
    //   }
  }

  ativaProduto(id: number) {
    this.produtoService.ativarProduto(id).subscribe({
      next: () => {
        this.carregarGrid();
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
