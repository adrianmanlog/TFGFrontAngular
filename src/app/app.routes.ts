import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Store } from './components/store/store';
import { Login } from '../app/components/login/login';
import { Register } from '../app/components/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: About },
  { path: 'tienda', component: Store },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];