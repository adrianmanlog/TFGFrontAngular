import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-edit-producto.html',
  styleUrls: ['./admin-edit-producto.css']
})
export class AdminEditProductoComponent implements OnInit {
  @Input() producto: any;
  @Input() categoriasLista: any[] = [];
  @Input() marcasLista: any[] = [];
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  editForm!: FormGroup;
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.editForm = this.fb.group({
      nombre: [this.producto.nombre, [Validators.required]],
      precio: [this.producto.precio, [Validators.required, Validators.min(0.01)]],
      stock: [this.producto.stock, [Validators.required]],
      categoria_id: [this.producto.categoria_id, [Validators.required]],
      marca_id: [this.producto.marca_id, [Validators.required]],
      imagen_url: [this.producto.imagen_url || ''],
      descripcion: [this.producto.descripcion || ''],
      destacado: [this.producto.destacado ? true : false]
    });
  }

  actualizar() {
    if (this.editForm.valid) {
      this.cargando.set(true);
      this.http.put(`https://tfgbacklaravel.onrender.com/api/productos/${this.producto.id}`, this.editForm.value).subscribe({
        next: () => {
          this.cargando.set(false);
          this.guardado.emit();
          this.cerrar.emit();
        },
        error: (err) => {
          this.cargando.set(false);
          console.error(err);
        }
      });
    }
  }
}