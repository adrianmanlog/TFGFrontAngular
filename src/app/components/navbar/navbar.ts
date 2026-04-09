import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Layout } from '../../services/layout';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Inyecciones modernas
  private layoutService = inject(Layout);
  private router = inject(Router);
  
  // Lo hacemos 'public' para poder usarlo en el HTML
  public authService = inject(Auth); 

  // Exponemos el Signal del modo tienda
  isStoreMode = this.layoutService.isStoreMode;

  toggleInterface() {
    const currentState = this.isStoreMode();
    if (currentState) {
      this.layoutService.setStoreMode(false);
      this.router.navigate(['/']);
    } else {
      this.layoutService.setStoreMode(true);
      this.router.navigate(['/tienda']);
    }
  }

  // Función para cerrar sesión y volver al inicio
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
