import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { Producto, Categoria, Marca } from '../../models/tienda.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, DecimalPipe,RouterLink],
  templateUrl: './catalogo.html'
})
export class CatalogoComponent implements OnInit {
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);
  public cartService = inject(CartService);
  productos = signal<Producto[]>([]);
  categorias = signal<Categoria[]>([]);
  marcas = signal<Marca[]>([]);

  busqueda = signal<string>('');
  categoriaSeleccionada = signal<number | null>(null);
  marcaSeleccionada = signal<number | null>(null);

  productosFiltrados = computed(() => {
    let lista = this.productos();

    if (this.categoriaSeleccionada() !== null) {
      lista = lista.filter(p => p.categoria_id === this.categoriaSeleccionada());
    }

    if (this.marcaSeleccionada() !== null) {
      lista = lista.filter(p => p.marca_id === this.marcaSeleccionada());
    }

    if (this.busqueda().trim() !== '') {
      const termino = this.busqueda().toLowerCase();
      lista = lista.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(termino))
      );
    }
    return lista;
  });

  ngOnInit() {
    this.productoService.getCategorias().subscribe(res => this.categorias.set(res));
    this.productoService.getMarcas().subscribe(res => this.marcas.set(res));
    this.productoService.getProductos().subscribe(res => this.productos.set(res));

    this.route.queryParams.subscribe(params => {
      if (params['categoria']) {
        this.categoriaSeleccionada.set(Number(params['categoria']));
      }
      if (params['marca']) {
        this.marcaSeleccionada.set(Number(params['marca']));
      }
      if (params['buscar']) {
        this.busqueda.set(params['buscar']);
      }
    });
  }

  seleccionarCategoria(id: number | null) {
    this.categoriaSeleccionada.set(id);
  }

  seleccionarMarca(id: number | null) {
    this.marcaSeleccionada.set(id);
  }

  actualizarBusqueda(event: any) {
    this.busqueda.set(event.target.value);
  }
}