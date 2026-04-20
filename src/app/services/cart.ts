import { Injectable, signal, computed } from '@angular/core';
import { Producto, CartItem } from '../models/tienda.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();
  
  totalCantidad = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.cantidad, 0);
  });

  totalPrecio = computed(() => {
    return this.cartItems().reduce((total, item) => {
      const precioNum = parseFloat(item.producto.precio);
      return total + (precioNum * item.cantidad);
    }, 0);
  });

  constructor() {
    this.reloadCart();
  }

  private getStorageKey(): string {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return `cart_ballestas_${user.id}`;
    }
    return 'cart_ballestas_guest';
  }

  reloadCart() {
    const saved = localStorage.getItem(this.getStorageKey());
    if (saved) {
      this.cartItems.set(JSON.parse(saved));
    } else {
      this.cartItems.set([]);
    }
  }

  addToCart(producto: Producto, cantidad: number = 1) {
    this.cartItems.update(items => {
      const itemIndex = items.findIndex(i => i.producto.id === producto.id);
      
      if (itemIndex > -1) {
        const newItems = [...items];
        const nuevaCantidad = newItems[itemIndex].cantidad + cantidad;
        if (nuevaCantidad <= producto.stock) {
          newItems[itemIndex].cantidad = nuevaCantidad;
        }
        this.saveCart(newItems);
        return newItems;
      }
      
      const newItems = [...items, { producto, cantidad }];
      this.saveCart(newItems);
      return newItems;
    });
  }

  removeFromCart(productoId: number) {
    this.cartItems.update(items => {
      const newItems = items.filter(i => i.producto.id !== productoId);
      this.saveCart(newItems);
      return newItems;
    });
  }

  updateQuantity(productoId: number, cantidad: number) {
    this.cartItems.update(items => {
      const newItems = items.map(item => {
        if (item.producto.id === productoId) {
          const cantidadValida = Math.max(1, Math.min(cantidad, item.producto.stock));
          return { ...item, cantidad: cantidadValida };
        }
        return item;
      });
      this.saveCart(newItems);
      return newItems;
    });
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem(this.getStorageKey());
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(items));
  }
}