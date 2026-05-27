import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto';
import { Categoria, Marca } from '../../../models/tienda.model';
import { HttpClient } from '@angular/common/http';
import { AdminEditProductoComponent } from '../admin-edit-producto/admin-edit-producto';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, AdminEditProductoComponent, DecimalPipe],
  templateUrl: './admin-productos-component.html',
  styleUrls: ['./admin-productos-component.css']
})
export class AdminProductosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private prodService = inject(ProductoService);
  private http = inject(HttpClient);

  categorias = signal<Categoria[]>([]);
  marcas = signal<Marca[]>([]);
  productos = signal<any[]>([]); // Almacena el listado global

  successMsg = signal(false);
  archivoSeleccionado: File | null = null;
  importMsg = signal<string>('');
  productoSeleccionado = signal<any | null>(null);

  productForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: [''],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required]],
    categoria_id: [null, [Validators.required]],
    marca_id: [null, [Validators.required]],
    imagen_url: [''],
    destacado: [false]
  });

  ngOnInit() {
    this.prodService.getCategorias().subscribe(res => this.categorias.set(res));
    this.prodService.getMarcas().subscribe(res => this.marcas.set(res));
    this.cargarCatalogo();
  }

  cargarCatalogo() {
    this.http.get<any[]>('https://tfgbacklaravel.onrender.com/api/productos').subscribe(res => {
      this.productos.set(res);
    });
  }

  guardarProducto() {
    if (this.productForm.valid) {
      this.http.post('https://tfgbacklaravel.onrender.com/api/productos', this.productForm.value).subscribe(() => {
        this.successMsg.set(true);
        this.productForm.reset({precio: 0, stock: 0, destacado: false});
        this.cargarCatalogo();
        setTimeout(() => this.successMsg.set(false), 3000);
      });
    }
  }

  borrarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar permanentemente este producto del inventario?')) {
      this.http.delete(`https://tfgbacklaravel.onrender.com/api/productos/${id}`).subscribe(() => {
        this.cargarCatalogo();
      });
    }
  }

  seleccionarArchivo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  subirArchivo() {
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('archivo', this.archivoSeleccionado);
      this.importMsg.set('Importando productos, por favor espera...');

      this.http.post('https://tfgbacklaravel.onrender.com/api/productos/importar', formData).subscribe({
        next: (res: any) => {
          this.importMsg.set('✅ ' + res.message);
          this.archivoSeleccionado = null;
          this.cargarCatalogo();
          setTimeout(() => this.importMsg.set(''), 5000);
        },
        error: (err) => {
          console.error(err);
          this.importMsg.set('❌ Error al importar. Comprueba el formato del archivo CSV.');
          setTimeout(() => this.importMsg.set(''), 5000);
        }
      });
    }
  }

  abrirEditar(producto: any) {
    this.productoSeleccionado.set(producto);
  }

  cerrarModal() {
    this.productoSeleccionado.set(null);
  }
}