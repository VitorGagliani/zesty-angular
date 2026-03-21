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

  ngOnInit() {
    this.categoriaService.listar().subscribe((categoria) => {
      this.categoria = categoria;
      console.log(categoria);
    });
  }

  abrirDialog() {
    this.dialog.open(DialogCadastroComponent, {
      width: '800px',
      data: {
        titulo: 'Cadastrar categoria',
        botao: 'Adicionar',
      },
    });
  }

  abrirDialogEditar() {
    this.dialog.open(DialogCadastroComponent, {
      width: '800px',
      data: {
        titulo: 'Editar categoria',
        botao: 'Salvar',
      },
    });
  }
}
