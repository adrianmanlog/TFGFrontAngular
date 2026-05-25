import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../../../models/tienda.model';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './admin-pedidos.html'
})
export class AdminPedidosComponent implements OnInit {
  private http = inject(HttpClient);

  pedidos = signal<Pedido[]>([]);
  cargando = signal<boolean>(true);
  descargandoId = signal<number | null>(null);
  textoBusqueda = signal<string>('');

  pedidosFiltrados = computed(() => {
    const termino = this.textoBusqueda().toLowerCase().trim();
    const lista = this.pedidos();

    if (!termino) return lista;

    return lista.filter(pedido => {
      const nombreCliente = pedido.usuario?.nombre?.toLowerCase() || '';
      return nombreCliente.includes(termino);
    });
  });

  actualizarBusqueda(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda.set(input.value);
  }

  ngOnInit() {
    this.http.get<Pedido[]>('http://localhost:8000/api/pedidos').subscribe({
      next: (res) => {
        this.pedidos.set(res);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar todos los pedidos', err);
        this.cargando.set(false);
      }
    });
  }

  descargarFactura(pedidoId: number) {
    this.descargandoId.set(pedidoId);
    
    this.http.get(`http://localhost:8000/api/pedidos/${pedidoId}/factura`, { responseType: 'blob' })
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
          alert('Error al descargar la factura');
          this.descargandoId.set(null);
        }
      });
  }
}