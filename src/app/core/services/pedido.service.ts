import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface CriarPedidoDTO {
  idMesa: number;
  clienteNome: string;
  telefone: string;
}

export interface VePedido {
  idPedido: number;
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

  listarCarrinho(data: VePedido): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedido`, {
      params: {
        idPedido: data.idPedido,
      },
    });
  }

}
