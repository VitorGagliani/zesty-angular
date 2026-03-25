import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoriaId: number;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/produto`;

  constructor() {}

  listar(categoriaId: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listar/${categoriaId}`);
  }

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/listar-produtos`);
  }

  criarProduto(data: Produto): Observable<any> {
    return this.http.post(`${this.apiUrl}/novo`, data);
  }

  editarProduto(produto: Produto): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, produto);
  }

  ativarProduto(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ativar/${id}`, {});
  }

  inativarProduto(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/inativar/${id}`, {});
  }
}
