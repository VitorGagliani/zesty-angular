import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface produtoMaisPedido {
  nome: string;
}

export interface pedidos {
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/dashboard`;

  produtoMaisPedido(): Observable<produtoMaisPedido[]> {
    return this.http.get<produtoMaisPedido[]>(`${this.apiUrl}/produtoPedido`);
  }

  totalMes(): Observable<pedidos[]> {
    return this.http.get<pedidos[]>(`${this.apiUrl}/totalPedidosMes`);
  }

  totalHoje(): Observable<pedidos[]>{
    return this.http.get<pedidos[]>(`${this.apiUrl}/totalPedidosHoje`);
  }

  emPreparo(): Observable<pedidos[]>{
    return this.http.get<pedidos[]>(`${this.apiUrl}/pedidosEmPreparo`)
  }
}
