import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mesa{
  id: number;
  numero: string;
}
@Injectable({
  providedIn: 'root'
})


export class MesaService {

  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/mesas`;

  constructor() { }

  listar(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/listar`);
  }
}
