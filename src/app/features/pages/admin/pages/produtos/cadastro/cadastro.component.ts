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
import { SupabaseService } from '../../../../../../core/services/supabase.service';
import { MatSelectModule } from '@angular/material/select';
import { ProdutoService } from '../../../../../../core/services/produto.service';

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
    MatSelectModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  private categoriaService = inject(CategoriaService);
  private produtoService = inject(ProdutoService);
  private supabase = inject(SupabaseService);
  categoria: Categoria[] = [];

  //crio o controle do form
  nome = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  descricao = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  preco = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  categoriaProduto = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  imagem = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CadastroComponent>,
  ) {}

  //post pro supabase

  imagemUrl: string = '';
  async uploadImagem(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;

    const supabase = this.supabase.getClient();

    const { error } = await supabase.storage
      .from('imgs-ecommerce')
      .upload(fileName, file);

    if (error) {
      console.error('Erro ao subir imagem', error);
      return;
    }

    const { data } = supabase.storage.from('produtos').getPublicUrl(fileName);

    this.imagemUrl = data.publicUrl;

    console.log('URL da imagem:', this.imagemUrl);
  }

  salvar() {
    const produto = {
      nome: this.nome.value,
      descricao: this.descricao.value,
      imagem: this.imagemUrl,
      preco: Number(this.preco.value),
      categoriaId: Number(this.categoriaProduto.value),
    };

    this.produtoService.criarProduto(produto).subscribe(() => {});
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
