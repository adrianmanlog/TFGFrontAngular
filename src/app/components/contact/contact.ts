import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  enviando = signal<boolean>(false);
  mensajeExito = signal<string>('');
  mensajeError = signal<string>('');

  contactoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    telefono: ['', Validators.required],
    mensaje: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactoForm.valid) {
      this.enviando.set(true);
      this.mensajeExito.set('');
      this.mensajeError.set('');

      this.http.post('https://tfgbacklaravel.onrender.com/api/contacto', this.contactoForm.value).subscribe({
        next: () => {
          this.enviando.set(false);
          this.mensajeExito.set('¡Mensaje enviado con éxito! Te responderemos pronto.');
          this.contactoForm.reset();
        },
        error: (err) => {
          this.enviando.set(false);
          this.mensajeError.set('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
          console.error(err);
        }
      });
    }
  }
}