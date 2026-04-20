import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  console.log('--- COMPROBANDO ACCESO ADMIN ---');
  console.log('Token:', authService.token());
  console.log('¿Es Admin?:', authService.isAdmin());

  if (authService.token() && authService.isAdmin()) {
    return true;
  }

  console.warn('ACCESO DENEGADO: Redirigiendo a home...');
  router.navigate(['/']);
  return false;
};