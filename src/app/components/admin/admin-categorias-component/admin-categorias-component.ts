import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminEditCategoriaComponent } from '../admin-edit-categoria/admin-edit-categoria';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [ReactiveFormsModule, AdminEditCategoriaComponent],
  templateUrl: './admin-categorias-component.html',
  styleUrls: ['./admin-categorias-component.css']
})
export class AdminCategoriasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  success = signal<boolean>(false);
  categorias = signal<any[]>([]);
  categoriaSeleccionada = signal<any | null>(null);

  catForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    icono: [''],
    descripcion: ['']
  });

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.http.get<any[]>('https://tfgbacklaravel.onrender.com/api/categorias').subscribe(res => {
      this.categorias.set(res);
    });
  }

  enviar() {
    if (this.catForm.valid) {
      this.http.post('https://tfgbacklaravel.onrender.com/api/categorias', this.catForm.value).subscribe({
        next: () => {
          this.success.set(true);
          this.catForm.reset();
          this.cargarCategorias();
          setTimeout(() => this.success.set(false), 3000);
        },
        error: (err) => console.error(err)
      });
    }
  }

  borrar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.http.delete(`https://tfgbacklaravel.onrender.com/api/categorias/${id}`).subscribe(() => {
        this.cargarCategorias();
      });
    }
  }

  abrirEditar(categoria: any) {
    this.categoriaSeleccionada.set(categoria);
  }

  cerrarModal() {
    this.categoriaSeleccionada.set(null);
  }
}