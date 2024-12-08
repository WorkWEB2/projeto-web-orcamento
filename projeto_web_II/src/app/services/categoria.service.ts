import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models';
import { Categoria } from '../shared/models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080/api-manutencao-equipamento';

  constructor(private http: HttpClient) { }

  cadastrar(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl + "/categoria/registrar", categoria);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/categoria/deletar/" + id);
  }

  atualizar(categoria: Categoria): Observable<any> {
    return this.http.put(this.apiUrl + "/categoria/alterar/" + categoria.id, categoria);
  }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + "/categoria");
  }

  buscarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.apiUrl + "/categoria/" + id);
  }

}
