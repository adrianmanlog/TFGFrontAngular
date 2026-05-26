import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';
import { Pedido } from '../../models/tienda.model';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './mis-pedidos.html'
})
export class MisPedidosComponent implements OnInit {
  private http = inject(HttpClient);
  public authService = inject(Auth);

  pedidos = signal<Pedido[]>([]);
  cargando = signal<boolean>(true);
  
  descargandoId = signal<number | null>(null);

  ngOnInit() {
    const usuario = this.authService.currentUser();
    if (usuario) {
      this.http.get<Pedido[]>(`https://tfgbacklaravel.onrender.com/api/usuarios/${usuario.id}/pedidos`).subscribe({
        next: (res) => {
          this.pedidos.set(res);
          this.cargando.set(false);
        },
        error: (err) => {
          console.error('Error al cargar pedidos', err);
          this.cargando.set(false);
        }
      });
    } else {
      this.cargando.set(false);
    }
  }

  descargarFactura(pedidoId: number) {
    this.descargandoId.set(pedidoId);
    
    this.http.get(`https://tfgbacklaravel.onrender.com/api/pedidos/${pedidoId}/factura`, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Factura_BallestasBeni_000${pedidoId}.pdf`; 
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          this.descargandoId.set(null);
        },
        error: (err) => {
          console.error('Error descargando factura', err);
          alert('Hubo un problema al generar la factura.');
          this.descargandoId.set(null);
        }
      });
  }
}