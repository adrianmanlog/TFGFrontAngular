import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsistenteService {
  private http = inject(HttpClient);

  private apiUrl = 'https://tfgbacklaravel.onrender.com/api/chat-ia';

  enviarMensaje(mensajeUsuario: string): Observable<string> {
    return this.http.post<any>(this.apiUrl, { mensaje: mensajeUsuario }).pipe(
      map(res => res.respuesta)
    );
  }
}