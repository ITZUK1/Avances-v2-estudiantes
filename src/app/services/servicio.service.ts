import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Cambia esta URL a la de tu API
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, id: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, id });
  }
}
