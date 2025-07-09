import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateProdutoDto, Produto, UpdateProdutoDto } from './produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly endpoint = 'produto';

  constructor(private api: ApiService) {}

  criar(produto: CreateProdutoDto): Observable<Produto> {
    return this.api.post<Produto>(this.endpoint, produto);
  }

  listarTodos(): Observable<Produto[]> {
    return this.api.get<Produto[]>(this.endpoint);
  }

  buscar(termo: string): Observable<Produto[]> {
    return this.api.get<Produto[]>(`${this.endpoint}/search`, { q: termo });
  }

  obterPorId(id: number): Observable<Produto> {
    return this.api.get<Produto>(`${this.endpoint}/${id}`);
  }

  atualizar(id: number, dados: UpdateProdutoDto): Observable<Produto> {
    return this.api.put<Produto>(`${this.endpoint}/${id}`, dados);
  }

  remover(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.endpoint}/${id}`);
  }
}
