import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Cliente, CreateClienteDto, UpdateClienteDto } from './cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly endpoint = 'cliente';

  constructor(private api: ApiService) {}

  criar(cliente: CreateClienteDto): Observable<Cliente> {
    return this.api.post<Cliente>(this.endpoint, cliente);
  }

  listarTodos(): Observable<Cliente[]> {
    return this.api.get<Cliente[]>(this.endpoint);
  }

  obterPorId(id: number): Observable<Cliente> {
    return this.api.get<Cliente>(`${this.endpoint}/${id}`);
  }

  atualizar(id: number, dados: UpdateClienteDto): Observable<Cliente> {
    return this.api.put<Cliente>(`${this.endpoint}/${id}`, dados);
  }

  remover(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.endpoint}/${id}`);
  }
}
