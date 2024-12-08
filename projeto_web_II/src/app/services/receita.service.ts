import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ReceitaCategoria } from '../shared/models/receitaCategoria.models';
import { ReceitaPeriodo } from '../shared/models/receitaPeriodo.models';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  url:string = 'http://localhost:8080/manutencao-equipamento-api';

  constructor(private http: HttpClient) { }

  buscarTodas(): Observable<ReceitaCategoria[]> {
    return this.http.get<ReceitaCategoria[]>(`${this.url}/receita/categoria`);
  }

  buscarPorPeriodo(): Observable<ReceitaPeriodo[]> {
    return this.http.get<ReceitaPeriodo[]>(`${this.url}/receita/periodo`);
  }
}
