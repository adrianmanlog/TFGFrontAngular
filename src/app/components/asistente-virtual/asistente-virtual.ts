import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsistenteService } from '../../services/asistente';

@Component({
  selector: 'app-asistente-virtual',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './asistente-virtual.html',
  styleUrls: ['./asistente-virtual.css']
})
export class AsistenteVirtualComponent {
  private asistenteService = inject(AsistenteService);

  abierto = signal<boolean>(false);
  cargando = signal<boolean>(false);
  mensajeUsuario = signal<string>('');

  mensajes = signal<{emisor: 'usuario' | 'bot', texto: string}[]>([
    { emisor: 'bot', texto: '¡Hola! Soy el asistente inteligente de Ballestas Beni 🤖. ¿En qué te puedo ayudar hoy?' }
  ]);

  toggleChat() {
    this.abierto.update(v => !v);
  }

  enviar() {
    const texto = this.mensajeUsuario().trim();
    if (!texto) return;

    this.mensajes.update(m => [...m, { emisor: 'usuario', texto }]);
    this.mensajeUsuario.set('');
    this.cargando.set(true);

    this.asistenteService.enviarMensaje(texto).subscribe({
      next: (respuesta) => {
        this.mensajes.update(m => [...m, { emisor: 'bot', texto: respuesta }]);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error de IA:', err);
        this.mensajes.update(m => [...m, { emisor: 'bot', texto: 'Uf, tengo los circuitos un poco saturados. ¿Podrías intentar preguntar de nuevo?' }]);
        this.cargando.set(false);
      }
    });
  }
}