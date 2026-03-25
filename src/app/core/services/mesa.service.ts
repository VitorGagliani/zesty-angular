import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mesa{
  id?: number;
  numero?: string;
  status?: string;
}
@Injectable({
  providedIn: 'root'
})


export class MesaService {

  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/mesas`;

  listar(): Observable<Mesa[]> {

    return this.http.get<Mesa[]>(`${this.apiUrl}/listar`);
  }

validaStatus(mesa: Mesa): boolean {
    return mesa.status !== 'Indisponivel';
  }

 criarMesa(data: Mesa): Observable<any> {
    return this.http.post(`${this.apiUrl}/nova`, data);
  }

 editarMesa(mesa: Mesa): Observable<any>{
  return this.http.put(
    `${this.apiUrl}/editar`,
    mesa
  );
}

excluirMesa(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
}


}
