import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importa 'of' desde 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  
  // Método para iniciar sesión y obtener el token
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token); // Convertir a booleano y envolver en un observable
  }

  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
