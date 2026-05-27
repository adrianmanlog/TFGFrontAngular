import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [BaseChartDirective,RouterLink],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {
  private http = inject(HttpClient);

  stats = signal<any>(null);
  
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  
  public chartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ { data: [], backgroundColor: ['#dc3545', '#ffc107', '#198754', '#0d6efd', '#6c757d'] } ]
  };

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.http.get<any>('https://tfgbacklaravel.onrender.com/api/admin/dashboard-stats').subscribe(res => {
      this.stats.set(res);

      const nombresCategorias = res.grafico_categorias.map((cat: any) => cat.nombre);
      const cantidadProductos = res.grafico_categorias.map((cat: any) => cat.productos_count);

      this.chartData = {
        labels: nombresCategorias,
        datasets: [{
          data: cantidadProductos,
          backgroundColor: ['#dc3545', '#ffc107', '#198754', '#0d6efd', '#0dcaf0']
        }]
      };
    });
  }
}