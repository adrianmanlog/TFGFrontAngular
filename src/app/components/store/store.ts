import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { Producto, Categoria, Marca } from '../../models/tienda.model';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterLink, DecimalPipe, FormsModule],
  templateUrl: './store.html'
})
export class StoreComponent implements OnInit {
  private productoService = inject(ProductoService);
  private router = inject(Router);
  public cartService = inject(CartService);
  categorias = signal<Categoria[]>([]);
  marcas = signal<Marca[]>([]);
  productosDestacados = signal<Producto[]>([]);
  terminoBusqueda = signal<string>('');

  ngOnInit() {
    this.productoService.getCategorias().subscribe(res => this.categorias.set(res));
    this.productoService.getMarcas().subscribe(res => this.marcas.set(res));
    this.productoService.getProductosDestacados().subscribe(res => this.productosDestacados.set(res));
  }

  buscarEnCatalogo() {
    this.router.navigate(['/catalogo'], {
      queryParams: { buscar: this.terminoBusqueda() }
    });
  }

  irACategoria(id: number) {
    this.router.navigate(['/catalogo'], {
      queryParams: { categoria: id }
    });
  }

  irAMarca(id: number) {
    this.router.navigate(['/catalogo'], {
      queryParams: { marca: id }
    });
  }
}