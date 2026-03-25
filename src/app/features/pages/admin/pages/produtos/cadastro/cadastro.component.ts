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
  produto?: any;
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
export class CadastroComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private produtoService = inject(ProdutoService);
  private supabase = inject(SupabaseService);

  categoria: Categoria[] = [];

  // ✅ FORM CONTROLS
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

  categoriaProduto = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });

  status = new FormControl<string | null>(null, {
    validators: [Validators.required],
  });

  imagemUrl: string = '';
  uploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CadastroComponent>,
  ) {}

  // ✅ UPLOAD IMAGEM
  async uploadImagem(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.uploading = true;

    const fileName = `${Date.now()}-${file.name}`;
    const supabase = this.supabase.getClient();

    const { error } = await supabase.storage
      .from('imgs-ecommerce')
      .upload(fileName, file);

    if (error) {
      console.error('Erro ao subir imagem', error);
      this.uploading = false;
      return;
    }

    const { data } = supabase.storage
      .from('imgs-ecommerce')
      .getPublicUrl(fileName);

    this.imagemUrl = data.publicUrl;

    this.uploading = false;

    console.log('URL da imagem:', this.imagemUrl);
  }


  marcarCamposComoTocados() {
    this.nome.markAsTouched();
    this.descricao.markAsTouched();
    this.preco.markAsTouched();
    this.categoriaProduto.markAsTouched();
    this.status.markAsTouched();
  }

  salvar() {
    if (
      this.nome.invalid ||
      this.descricao.invalid ||
      this.preco.invalid ||
      this.categoriaProduto.invalid ||
      this.status.invalid||
      !this.imagemUrl
    ) {
      this.marcarCamposComoTocados();
      return;
    }

    const produto = {
      id: this.data.produto?.id,
      nome: this.nome.value,
      descricao: this.descricao.value,
      imagem: this.imagemUrl,
      preco: Number(this.preco.value),
      categoriaId: Number(this.categoriaProduto.value),
      status:this.data.produto?.status
    };

    if (this.data.produto) {
      // ✏️ EDITAR
      this.produtoService.editarProduto(produto).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      // ➕ CRIAR
      this.produtoService.criarProduto(produto).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  // ✅ CARREGAR DADOS (EDIT)
  ngOnInit() {
    if (this.data.produto) {
      this.nome.setValue(this.data.produto.nome);
      this.descricao.setValue(this.data.produto.descricao);
      this.preco.setValue(this.data.produto.preco.toString());
      this.categoriaProduto.setValue(this.data.produto.categoriaId?.toString());
      this.imagemUrl = this.data.produto.imagem;
    }

    this.categoriaService.listar().subscribe((categoria) => {
      this.categoria = categoria;
    });
  }
}
