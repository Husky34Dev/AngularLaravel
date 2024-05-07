import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true); // Actualiza el estado de autenticación
      }),
      catchError(error => {
        this.isAuthenticatedSubject.next(false); // Actualiza el estado de autenticación en caso de error
        return of(error);
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Actualiza el estado de autenticación
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated); // Actualiza el estado de autenticación
    return this.isAuthenticatedSubject.asObservable();
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
