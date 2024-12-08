import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api-manutencao-equipamento';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl + "/cliente/registrar", usuario);

  }

}

