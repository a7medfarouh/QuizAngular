import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { questionGuard } from './question.guard';

describe('questionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => questionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
