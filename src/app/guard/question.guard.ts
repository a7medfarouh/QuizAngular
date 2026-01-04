import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SetupService } from '../serivces/setup.service';

export const questionGuard: CanActivateFn = () => {
  const setup = inject(SetupService);
  const router = inject(Router);

  return setup.hasQuestions()
    ? true
    : router.createUrlTree(['/setup']);
};
