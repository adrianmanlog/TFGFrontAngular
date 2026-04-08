import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Layout } from '../../services/layout';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private layoutService = inject(Layout);
  private router = inject(Router);

  // Exponemos el Signal al HTML para que reaccione a los cambios
  isStoreMode = this.layoutService.isStoreMode;

  // Función que se ejecuta al pulsar el botón
  toggleInterface() {
    const currentState = this.isStoreMode(); // Leemos el valor actual del Signal

    if (currentState) {
      // Si estábamos en la tienda, volvemos a la web
      this.layoutService.setStoreMode(false);
      this.router.navigate(['/']);
    } else {
      // Si estábamos en la web, vamos a la tienda
      this.layoutService.setStoreMode(true);
      this.router.navigate(['/tienda']);
    }
  }
}
