import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-edit-categoria.html',
  styleUrls: ['./admin-edit-categoria.css']
})
export class AdminEditCategoriaComponent implements OnInit {
  @Input() categoria: any;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  editForm!: FormGroup;
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.editForm = this.fb.group({
      nombre: [this.categoria.nombre, [Validators.required, Validators.maxLength(100)]],
      icono: [this.categoria.icono || '']
    });
  }

  actualizar() {
    if (this.editForm.valid) {
      this.cargando.set(true);
      this.http.put(`https://tfgbacklaravel.onrender.com/api/categorias/${this.categoria.id}`, this.editForm.value).subscribe({
        next: () => {
          this.cargando.set(false);
          this.guardado.emit();
          this.cerrar.emit();
        },
        error: (err) => {
          this.cargando.set(false);
          console.error('Error al actualizar:', err);
        }
      });
    }
  }
}