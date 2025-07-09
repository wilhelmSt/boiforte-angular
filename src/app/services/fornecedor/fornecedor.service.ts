import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateFornecedorDto, Fornecedor, UpdateFornecedorDto } from './fornecedor';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private readonly endpoint = 'fornecedor';

  constructor(private api: ApiService) {}

  criar(fornecedor: CreateFornecedorDto): Observable<Fornecedor> {
    return this.api.post<Fornecedor>(this.endpoint, fornecedor);
  }

  listarTodos(): Observable<Fornecedor[]> {
    return this.api.get<Fornecedor[]>(this.endpoint);
  }

  buscar(termo: string): Observable<Fornecedor[]> {
    return this.api.get<Fornecedor[]>(`${this.endpoint}/search`, { q: termo });
  }

  obterPorId(id: number): Observable<Fornecedor> {
    return this.api.get<Fornecedor>(`${this.endpoint}/${id}`);
  }

  atualizar(id: number, dados: UpdateFornecedorDto): Observable<Fornecedor> {
    return this.api.put<Fornecedor>(`${this.endpoint}/${id}`, dados);
  }

  remover(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
