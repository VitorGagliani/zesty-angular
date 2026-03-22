
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria{
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/categorias`;

  constructor() { }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/listar`);
  }

 criarCategoria(data: Categoria): Observable<any> {
    return this.http.post(`${this.apiUrl}/novo`, data);
  }

 editarCategoria(categoria: Categoria): Observable<any>{
  return this.http.put(
    `${this.apiUrl}/editar`,
    categoria
  );
}

  excluirCategoria(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
}

}
