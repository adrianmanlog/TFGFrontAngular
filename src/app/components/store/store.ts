import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [DecimalPipe],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  // Categorías principales de la tienda
  categorias = signal([
    { id: 1, nombre: 'Ballestas Completas', icono: 'bi-layers-half', desc: 'Parabólicas y convencionales' },
    { id: 2, nombre: 'Abarcones', icono: 'bi-magnet', desc: 'Todas las métricas y medidas' },
    { id: 3, nombre: 'Silentblocks', icono: 'bi-circle-square', desc: 'Goma, poliuretano y metálicos' },
    { id: 4, nombre: 'Suspensión Neumática', icono: 'bi-wind', desc: 'Diapress, fuelles y válvulas' }
  ]);

  // Marcas con las que trabajáis
  marcas = signal([
    { id: 1, nombre: 'WABCO' },
    { id: 2, nombre: 'LECITRAILER' },
    { id: 3, nombre: 'BPW' },
    { id: 4, nombre: 'SAF HOLLAND' },
    { id: 5, nombre: 'AL-KO' }
  ]);

  // Productos destacados para la portada
  productosDestacados = signal([
    { id: 1, nombre: 'Ballesta Parabólica Delantera Volvo FH', precio: 345.50, imagen: 'https://via.placeholder.com/300x200?text=Ballesta+Volvo' },
    { id: 2, nombre: 'Fuelle Neumático Suspensión Trasera', precio: 89.90, imagen: 'https://via.placeholder.com/300x200?text=Fuelle+Neumatico' },
    { id: 3, nombre: 'Abarcón Acero Alta Resistencia M24', precio: 18.20, imagen: 'https://via.placeholder.com/300x200?text=Abarcon' },
    { id: 4, nombre: 'Silentblock Ojo Ballesta 30x60x80', precio: 24.00, imagen: 'https://via.placeholder.com/300x200?text=Silentblock' }
  ]);
}
