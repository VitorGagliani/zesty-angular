import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Comanda } from './comanda.service';

export interface CriarPedidoDTO {
  idMesa: number;
  clienteNome: string;
  telefone: string;
}

export interface VePedido {
  idPedido: number;
}

export interface Grid {
  id: number;
  pedido_id: number;
  mesa_id: number;
  status: string;
  produto_id: number;
  quantidade: number;
  observacao: string;
  Produto: string;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pedido`;

  criarPedido(data: CriarPedidoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/novo`, data);
  }

  listarCarrinho(idPedido: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idPedido}`, {
      params: {
        idPedido: idPedido,
      },
    });
  }

  listarCozinha(): Observable<any> {
    return this.http.get(`${this.apiUrl}/grid`);
  }

 prepararComanda(id: number): Observable<any>{
  return this.http.put(
    `${this.apiUrl}/preparar-comanda`,
    {
    //aqui é o json
    id: id
    });
}

   fecharComanda(id: number): Observable<any>{
  return this.http.put(
    `${this.apiUrl}/fechar-comanda`,
    {
    //aqui é o json
    id: id
    });
}

}
