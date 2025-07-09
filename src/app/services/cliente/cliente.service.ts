import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

export type Cliente = {
  id: number;
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};

export type CreateClienteDto = {
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};

export type UpdateClienteDto = {
  nome?: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};

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
