import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateFornecedorDto, Fornecedor, UpdateFornecedorDto } from 'src/app/interfaces/fornecedor';
import { SearchResponse, TSearch } from 'src/app/interfaces/geral';

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

  buscar(termo?: TSearch): Observable<SearchResponse<Fornecedor>> {
    return this.api.get<SearchResponse<Fornecedor>>(`${this.endpoint}/search`, termo);
  }

  getTopFornecedores(): Observable<Array<Fornecedor>> {
    return this.api.get<Array<Fornecedor>>(`${this.endpoint}/top-fornecedores`);
  }

  getFornecedoresAtivos(): Observable<{ fornecedoresAtivos: number }> {
    return this.api.get<{ fornecedoresAtivos: number }>(`${this.endpoint}/fornecedores-ativos`);
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
