import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Store } from './components/store/store';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'nosotros', component: About },
  { path: 'tienda', component: Store },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];