import { Component, inject, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.html'
})
export class CartComponent {
  public cartService = inject(CartService);
  public authService = inject(Auth);
  private http = inject(HttpClient);

  procesandoPago = signal<boolean>(false);
  pagoCompletado = signal<boolean>(false);
  numeroPedido = signal<number | null>(null);

  getPrecioNumerico(precioStr: string): number {
    return parseFloat(precioStr);
  }

  cambiarCantidad(productoId: number, event: any) {
    const nuevaCantidad = parseInt(event.target.value, 10);
    this.cartService.updateQuantity(productoId, nuevaCantidad);
  }

  tramitarPedido() {
    const usuario = this.authService.currentUser();
    if (!usuario) {
      alert("Por favor, inicia sesión o regístrate para poder realizar el pago.");
      return;
    }

    this.procesandoPago.set(true);

    const totalConIva = this.cartService.totalPrecio() * 1.21;
    
    const payload = {
      usuario_id: usuario.id,
      total: totalConIva,
      items: this.cartService.items()
    };

    this.http.post('https://tfgbacklaravel.onrender.com/api/procesar-pago', payload).subscribe({
      next: (res: any) => {
        this.procesandoPago.set(false);
        this.pagoCompletado.set(true);
        this.numeroPedido.set(res.pedido_id);
        
        this.cartService.clearCart();
      },
      error: (err) => {
        this.procesandoPago.set(false);
        alert("Hubo un error con la tarjeta: " + err.error?.error);
      }
    });
  }
}