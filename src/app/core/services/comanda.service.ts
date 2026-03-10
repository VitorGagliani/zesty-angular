import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';



export interface Comanda{
  idPedido: number;
  mesa: number;
  idProduto: number;
  quantidade: number;
  observacao: string;
}

@Injectable({
  providedIn: 'root'
})

export class ComandaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/pedido`;

    criarPedido(data: Comanda): Observable<any> {
        return this.http.post(`${this.apiUrl}/adicionar`, data);
      }
}
