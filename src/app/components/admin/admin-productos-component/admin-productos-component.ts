import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto';
import { Categoria, Marca } from '../../../models/tienda.model';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-productos-component.html'
})
export class AdminProductosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private prodService = inject(ProductoService);
  private http = inject(HttpClient);

  categorias = signal<Categoria[]>([]);
  marcas = signal<Marca[]>([]);
  successMsg = signal(false);

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
  }

  guardarProducto() {
    if (this.productForm.valid) {
      this.http.post('http://localhost:8000/api/productos', this.productForm.value).subscribe(() => {
        this.successMsg.set(true);
        this.productForm.reset({precio: 0, stock: 0, destacado: false});
        setTimeout(() => this.successMsg.set(false), 3000);
      });
    }
  }
}