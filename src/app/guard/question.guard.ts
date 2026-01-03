import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SetupService } from '../serivces/setup.service';

export const questionGuard: CanActivateFn = (route, state) => {
  const setup = inject(SetupService);
  const router = inject(Router);

  const qs = setup.questions();
  if (qs && qs.length > 0) return true;

  return router.createUrlTree(['/setup']);
};
