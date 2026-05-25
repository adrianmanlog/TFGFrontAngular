import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMensaje = signal<string>('');
  
  registroCompletado = signal<boolean>(false);
  qrCodeSeguro = signal<SafeHtml | null>(null);
  secretKey = signal<string>('');

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.secretKey.set(res.secret_key);
          this.qrCodeSeguro.set(this.sanitizer.bypassSecurityTrustHtml(res.qr_code));

          this.registroCompletado.set(true);
        },
        error: (err) => {
          console.error('🚨 ERROR REAL DE LARAVEL:', err.error); 

          const mensajeReal = err.error?.message || 'Error desconocido al registrar.';
          this.errorMensaje.set(mensajeReal);
        }
      });
    }
  }
}