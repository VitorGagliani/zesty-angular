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

}
