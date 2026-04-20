import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Layout {
  isStoreMode = signal<boolean>(false);

  setStoreMode(status: boolean) {
    this.isStoreMode.set(status);
  }
}
