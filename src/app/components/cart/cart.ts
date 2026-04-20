import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink], // CommonModule ya no hace falta si usamos @if y @for
  templateUrl: './cart.html'
})
export class CartComponent {
  public cartService = inject(CartService);

  // Convertimos el string del precio a número para poder multiplicar en el HTML
  getPrecioNumerico(precioStr: string): number {
    return parseFloat(precioStr);
  }

  cambiarCantidad(productoId: number, event: any) {
    const nuevaCantidad = parseInt(event.target.value, 10);
    this.cartService.updateQuantity(productoId, nuevaCantidad);
  }
}