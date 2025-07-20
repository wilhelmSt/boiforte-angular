import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchResponse, TSearch } from 'src/app/interfaces/geral';
import { Observable } from 'rxjs';
import { EspecieCorte, TEspecie } from 'src/app/interfaces/especie';

@Injectable({
  providedIn: 'root',
})
export class EspecieService {
  private readonly endpoint = 'especie-produto';

  constructor(private api: ApiService) {}

  buscar(termo?: TSearch): Observable<SearchResponse<TEspecie>> {
    return this.api.get<SearchResponse<TEspecie>>(`${this.endpoint}/search`, termo);
  }

  listCortes(): Observable<EspecieCorte[]> {
    return this.api.get<EspecieCorte[]>(`${this.endpoint}/cortes`);
  }
}
