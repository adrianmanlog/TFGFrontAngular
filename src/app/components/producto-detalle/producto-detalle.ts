import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { CartService } from '../../services/cart';
import { Producto } from '../../models/tienda.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './producto-detalle.html'
})
export class ProductoDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  public cartService = inject(CartService);

  producto = signal<Producto | null>(null);
  cargando = signal<boolean>(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productoService.getProductoById(Number(id)).subscribe({
        next: (res) => {
          this.producto.set(res);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error cargando el producto', err);
          this.cargando.set(false);
        }
      });
    }
  }
}