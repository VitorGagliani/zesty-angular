import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Categoria,
  CategoriaService,
} from '../../../../../../core/services/categoria.service';

interface DialogData {
  titulo: string;
  botao: string;
  categoria?: any;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  private categoriaService = inject(CategoriaService);

  categoria: Categoria[] = [];

  //crio o controle do form
  nome = new FormControl('', Validators.required);
  descricao = new FormControl('', Validators.required);
  preco = new FormControl('', Validators.required);
  categoriaProduto = new FormControl('', Validators.required);
  imagem = new FormControl('', Validators.required);



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CadastroComponent>,
  ) {}

  salvar() {
    //crio a constante e salvo com os dados do data da pagina
    const resultado = {
      id: this.data.categoria?.id,
      nome: this.nome.value,
    };
    //passo o resultado para a pagina para manipular com o afterClose()
    this.dialogRef.close(resultado);
  }

  ngOnInit() {
    if (this.data.categoria) {
      this.nome.setValue(this.data.categoria.nome); //seto o valor do form com o valor passado na categoria
    }
    this.categoriaService.listar().subscribe((categoria) => {
      this.categoria = categoria;
    });
  }
}
