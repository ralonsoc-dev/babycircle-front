import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', credentials).pipe(
      tap(response => {
        // Guardar el token en el localStorage
        localStorage.setItem(this.tokenKey, response.token);
      }),
      catchError(error => {
        console.error('Error during login', error);
        return of(null);
      })
    );
  }

  logout(): void {
    // Eliminar el token del localStorage
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Verificar si el token existe en el localStorage
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    // Obtener el token del localStorage
    return localStorage.getItem(this.tokenKey);
  }
}
