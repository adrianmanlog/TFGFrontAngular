import { Component, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Layout } from '../../services/layout';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public layoutService = inject(Layout);
  private router = inject(Router);
  public cartService = inject(CartService);
  public authService = inject(Auth); 

  isStoreMode = this.layoutService.isStoreMode;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url === '/' || event.url === '/nosotros') {
        this.layoutService.setStoreMode(false);
      } 
      else if (event.url.includes('/catalogo') || event.url.includes('/carrito') || event.url.includes('/admin') || event.url.includes('/mis-pedidos')) {
        this.layoutService.setStoreMode(true);
      }
    });
  }

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

  logout() {
    this.authService.logout();
    this.layoutService.setStoreMode(false);
    this.router.navigate(['/']);
  }
}