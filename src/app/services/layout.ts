import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Layout {
  // Creamos un Signal inicializado en false (por defecto estamos en la Web, no en la tienda)
  isStoreMode = signal<boolean>(false);

  // Función para cambiar el estado manualmente si lo necesitamos
  setStoreMode(status: boolean) {
    this.isStoreMode.set(status);
  }
}
