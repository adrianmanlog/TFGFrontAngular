import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-marcas',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './admin-marcas.html'
})
export class AdminMarcasComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  success = signal<boolean>(false);

  marcaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]]
  });

  enviar() {
    if (this.marcaForm.valid) {
      this.http.post('http://localhost:8000/api/marcas', this.marcaForm.value).subscribe({
        next: (res) => {
          this.success.set(true);
          this.marcaForm.reset();
          setTimeout(() => this.success.set(false), 3000);
        },
        error: (err) => {
          console.error('Error al guardar la marca:', err);
        }
      });
    }
  }
}