import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Compra, CreateCompraDto, UpdateCompraDto } from './compra';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private readonly endpoint = 'compra';

  constructor(private api: ApiService) {}

  criar(compra: CreateCompraDto): Observable<Compra> {
    return this.api.post<Compra>(this.endpoint, compra);
  }

  listarTodos(): Observable<Compra[]> {
    return this.api.get<Compra[]>(this.endpoint);
  }

  obterPorId(id: number): Observable<Compra> {
    return this.api.get<Compra>(`${this.endpoint}/${id}`);
  }

  atualizar(id: number, dados: UpdateCompraDto): Observable<Compra> {
    return this.api.put<Compra>(`${this.endpoint}/${id}`, dados);
  }

  remover(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.endpoint}/${id}`);
  }
}
