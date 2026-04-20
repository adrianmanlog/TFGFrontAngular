import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { StoreComponent } from './components/store/store';
import { Login } from '../app/components/login/login';
import { Register } from '../app/components/register/register';
import { CatalogoComponent } from './components/catalogo/catalogo';
import { CartComponent } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: About },
  { path: 'tienda', component: StoreComponent },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrito', component: CartComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];