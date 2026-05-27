import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { StoreComponent } from './components/store/store';
import { Login } from '../app/components/login/login';
import { Register } from '../app/components/register/register';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { CartComponent } from './components/cart/cart';
import { adminGuard } from './guards/admin-guard';
import { AdminProductosComponent } from './components/admin/admin-productos-component/admin-productos-component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias-component/admin-categorias-component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout';
import { AdminMarcasComponent } from './components/admin/admin-marcas/admin-marcas';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos';
import { AdminPedidosComponent } from './components/admin/admin-pedidos/admin-pedidos';
import { AdminDashboardComponent } from '../app/components/admin/admin-dashboard/admin-dashboard';
export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'productos', component: AdminProductosComponent },
      { path: 'categorias', component: AdminCategoriasComponent },
      { path: 'marcas', component: AdminMarcasComponent },
      { path: 'pedidos', component: AdminPedidosComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' }
    ]
  },
  { path: 'mis-pedidos', component: MisPedidosComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'nosotros', component: About },
  { path: 'tienda', component: StoreComponent },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CartComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];