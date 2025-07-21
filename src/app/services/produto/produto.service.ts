import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateProdutoDto, Produto, ProdutoRes, UpdateProdutoDto } from 'src/app/interfaces/produto';
import { SearchResponse, TSearch } from 'src/app/interfaces/geral';

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

  buscar(termo?: TSearch): Observable<SearchResponse<ProdutoRes>> {
    return this.api.get<SearchResponse<ProdutoRes>>(`${this.endpoint}/search`, termo);
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
