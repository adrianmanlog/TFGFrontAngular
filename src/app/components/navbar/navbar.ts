import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private layoutService = inject(Layout);
  private router = inject(Router);
  public cartService = inject(CartService);
  public authService = inject(Auth); 

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
