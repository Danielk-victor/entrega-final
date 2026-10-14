import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

/** Operações REST comuns (GET all, GET by id, POST, PUT, DELETE). */
export abstract class CrudService<T extends { id?: string }> {
  protected readonly http = inject(HttpClient);

  protected constructor(private readonly url: string) {}

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  buscarPorId(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  criar(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  atualizar(id: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, item);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
