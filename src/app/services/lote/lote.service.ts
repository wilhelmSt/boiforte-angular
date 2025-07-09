import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CreateLoteDto, Lote, UpdateLoteDto } from './lote';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private readonly endpoint = 'lote';

  constructor(private api: ApiService) {}

  criar(lote: CreateLoteDto): Observable<Lote> {
    const loteData = {
      ...lote,
      vencimento: typeof lote.vencimento === 'string' ? lote.vencimento : lote.vencimento.toISOString(),
    };
    return this.api.post<Lote>(this.endpoint, loteData);
  }

  listarTodos(): Observable<Lote[]> {
    return this.api.get<Lote[]>(this.endpoint);
  }

  obterPorId(id: number): Observable<Lote> {
    return this.api.get<Lote>(`${this.endpoint}/${id}`);
  }

  atualizar(id: number, dados: UpdateLoteDto): Observable<Lote> {
    const dadosAtualizados = {
      ...dados,
      ...(dados.vencimento && {
        vencimento: typeof dados.vencimento === 'string' ? dados.vencimento : dados.vencimento.toISOString(),
      }),
    };
    return this.api.put<Lote>(`${this.endpoint}/${id}`, dadosAtualizados);
  }

  remover(id: number): Observable<{ message: string }> {
    return this.api.delete<{ message: string }>(`${this.endpoint}/${id}`);
  }

  listarPorProduto(produtoId: number): Observable<Lote[]> {
    return this.api.get<Lote[]>(this.endpoint, { produtoId });
  }

  listarPorFornecedor(fornecedorId: number): Observable<Lote[]> {
    return this.api.get<Lote[]>(this.endpoint, { fornecedorId });
  }
}
