import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CartService } from './cart';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);  
  private cartService = inject(CartService);  
  private apiUrl = 'http://localhost:8000/api';

  currentUser = signal<any>(null);
  token = signal<string | null>(localStorage.getItem('auth_token'));
  isAdmin = signal<boolean>(false);

  constructor() {
  const storedUser = localStorage.getItem('user_data');
  const storedToken = localStorage.getItem('auth_token');
  
  if (storedUser && storedToken) {
    const user = JSON.parse(storedUser);
    this.token.set(storedToken);
    this.currentUser.set(user);
    this.isAdmin.set(!!user.es_admin); 
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    this.token.set(null);
    this.currentUser.set(null);
    this.isAdmin.set(false);

    this.cartService.reloadCart(); 
    
    this.router.navigate(['/']);
  }

  guardarSesion(token: string, user: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    
    this.token.set(token);
    this.currentUser.set(user);
    this.isAdmin.set(!!user.es_admin);

    this.cartService.reloadCart(); 
  }
}
