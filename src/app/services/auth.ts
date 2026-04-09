import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api'; // La URL de tu Laravel

  // Signals para el estado global (reactivo)
  currentUser = signal<any>(null);
  token = signal<string | null>(localStorage.getItem('auth_token'));
  isAdmin = signal<boolean>(false);

  constructor() {
    // Si hay un usuario guardado al recargar la página, lo recuperamos
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUser.set(user);
      this.isAdmin.set(user.es_admin);
    }
  }

  login(credenciales: any) {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((response: any) => {
        this.guardarSesion(response.access_token, response.user);
      })
    );
  }

  register(datos: any) {
    return this.http.post(`${this.apiUrl}/registro`, datos).pipe(
      tap((response: any) => {
        this.guardarSesion(response.access_token, response.user);
      })
    );
  }

  logout() {
    // Opcional: Llamar al endpoint de logout en Laravel aquí
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.token.set(null);
    this.currentUser.set(null);
    this.isAdmin.set(false);
  }

  private guardarSesion(token: string, user: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.token.set(token);
    this.currentUser.set(user);
    this.isAdmin.set(user.es_admin);
  }
}
