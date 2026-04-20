import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-categorias-component.html'
})
export class AdminCategoriasComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  success = signal<boolean>(false);

  catForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    icono: [''],
    descripcion: ['']
  });

  enviar() {
    if (this.catForm.valid) {
      this.http.post('http://localhost:8000/api/categorias', this.catForm.value).subscribe({
        next: (res) => {
          this.success.set(true);
          this.catForm.reset();
          setTimeout(() => this.success.set(false), 3000);
        },
        error: (err) => {
          console.error('Hubo un error al guardar en la base de datos:', err);
        }
      });
    }
  }
}