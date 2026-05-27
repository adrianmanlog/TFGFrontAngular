import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminEditMarcaComponent } from '../admin-edit-marca/admin-edit-marca';

@Component({
  selector: 'app-admin-marcas',
  standalone: true,
  imports: [ReactiveFormsModule, AdminEditMarcaComponent], 
  templateUrl: './admin-marcas.html',
  styleUrls: ['./admin-marcas.css']
})
export class AdminMarcasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  success = signal<boolean>(false);
  marcas = signal<any[]>([]);
  marcaSeleccionada = signal<any | null>(null);

  marcaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.http.get<any[]>('https://tfgbacklaravel.onrender.com/api/marcas').subscribe(res => {
      this.marcas.set(res);
    });
  }

  enviar() {
    if (this.marcaForm.valid) {
      this.http.post('https://tfgbacklaravel.onrender.com/api/marcas', this.marcaForm.value).subscribe({
        next: () => {
          this.success.set(true);
          this.marcaForm.reset();
          this.cargarMarcas();
          setTimeout(() => this.success.set(false), 3000);
        },
        error: (err) => console.error(err)
      });
    }
  }

  borrar(id: number) {
    if (confirm('¿Deseas desvincular esta marca del sistema?')) {
      this.http.delete(`https://tfgbacklaravel.onrender.com/api/marcas/${id}`).subscribe(() => {
        this.cargarMarcas();
      });
    }
  }

  abrirEditar(marca: any) {
    this.marcaSeleccionada.set(marca);
  }

  cerrarModal() {
    this.marcaSeleccionada.set(null);
  }
}