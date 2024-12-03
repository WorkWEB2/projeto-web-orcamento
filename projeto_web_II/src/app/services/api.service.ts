import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  getAddress(cep: string): Observable<any> {
    return this.http.get(`${this.viaCepUrl}/${cep}/json/`);
  }

  sendEmail(email: string, subject: string, message: string) {
    const emailData = { email, subject, message };
    return this.http.post('/api/send-email', emailData);
  }
}
