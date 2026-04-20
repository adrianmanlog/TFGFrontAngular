import { Injectable, signal, computed } from '@angular/core';
import { Producto, CartItem } from '../models/tienda.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadCart());

  // Señales calculadas (Magia de Angular: se actualizan solas)
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

  constructor() {}

  // Añadir un producto al carrito
  addToCart(producto: Producto, cantidad: number = 1) {
    this.cartItems.update(items => {
      const itemIndex = items.findIndex(i => i.producto.id === producto.id);
      
      // Si el producto ya está en el carrito, le sumamos la cantidad (respetando el stock)
      if (itemIndex > -1) {
        const newItems = [...items];
        const nuevaCantidad = newItems[itemIndex].cantidad + cantidad;
        if (nuevaCantidad <= producto.stock) {
          newItems[itemIndex].cantidad = nuevaCantidad;
        }
        this.saveCart(newItems);
        return newItems;
      }
      
      // Si no está, lo añadimos nuevo
      const newItems = [...items, { producto, cantidad }];
      this.saveCart(newItems);
      return newItems;
    });
  }

  // Eliminar una línea entera del carrito
  removeFromCart(productoId: number) {
    this.cartItems.update(items => {
      const newItems = items.filter(i => i.producto.id !== productoId);
      this.saveCart(newItems);
      return newItems;
    });
  }

  // Actualizar cantidad desde el input de la página del carrito
  updateQuantity(productoId: number, cantidad: number) {
    this.cartItems.update(items => {
      const newItems = items.map(item => {
        if (item.producto.id === productoId) {
          // Aseguramos que la cantidad esté entre 1 y el stock máximo
          const cantidadValida = Math.max(1, Math.min(cantidad, item.producto.stock));
          return { ...item, cantidad: cantidadValida };
        }
        return item;
      });
      this.saveCart(newItems);
      return newItems;
    });
  }

  // Vaciar carrito
  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem('cart_ballestas');
  }

  // Guardar en el navegador
  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart_ballestas', JSON.stringify(items));
  }

  // Cargar desde el navegador al abrir la web
  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart_ballestas');
    return saved ? JSON.parse(saved) : [];
  }
}