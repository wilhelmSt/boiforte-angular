import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, body: any, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { params: httpParams });
  }

  put<T>(endpoint: string, body: any, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, { params: httpParams });
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }
}
