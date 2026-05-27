import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-marca',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-edit-marca.html',
  styleUrls: ['./admin-edit-marca.css']
})
export class AdminEditMarcaComponent implements OnInit {
  @Input() marca: any;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  editForm!: FormGroup;
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.editForm = this.fb.group({
      nombre: [this.marca.nombre, [Validators.required, Validators.maxLength(100)]]
    });
  }

  actualizar() {
    if (this.editForm.valid) {
      this.cargando.set(true);
      this.http.put(`https://tfgbacklaravel.onrender.com/api/marcas/${this.marca.id}`, this.editForm.value).subscribe({
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