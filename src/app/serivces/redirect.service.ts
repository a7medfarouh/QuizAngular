import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor( private router: Router) { }

  redirectToResult() {
    // Navigation logic to redirect to question component
    this.router.navigate(['/result']);
  }

   redirectToQuestion() {
    // Navigation logic to redirect to question component
    this.router.navigate(['/question']);
  }
  redirectToSetup(){
    this.router.navigate(['/setup']);
  }
}
