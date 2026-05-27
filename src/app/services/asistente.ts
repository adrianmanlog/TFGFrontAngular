import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsistenteService {
  private http = inject(HttpClient);
  
  private apiKey = 'AIzaSyBWV7b3ORxrzRWxpv6Ksv7wKmWklW7WuQg'; 
  
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  enviarMensaje(mensajeUsuario: string): Observable<string> {
    const promptContext = `
      Eres el asistente virtual experto de la tienda "Ballestas Beni", especializada en repuestos y ballestas para vehículos industriales y camiones.
      Tu trabajo es ayudar a los clientes con dudas sobre recambios de forma amable, breve y muy profesional. 
      Nunca inventes precios exactos ni prometas stock. Solo orienta al usuario.
      Pregunta del cliente: "${mensajeUsuario}"
    `;

    const body = {
      contents: [{ parts: [{ text: promptContext }] }]
    };

    return this.http.post<any>(this.apiUrl, body).pipe(
      map(res => res.candidates[0].content.parts[0].text)
    );
  }
}