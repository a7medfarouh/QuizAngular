import { Injectable, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private baseApiUrl = 'https://opentdb.com/';

  // 🔹 signals
  categories = signal<Array<{ id: number; name: string }>>([]);
  private _questions = signal<any[]>([]);
  questions = this._questions.asReadonly();
  loading = signal(false);

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  // ===============================
  // Categories
  // ===============================
  loadCategories() {
    this.http
      .get<{ trivia_categories: Array<{ id: number; name: string }> }>(
        `${this.baseApiUrl}api_category.php`
      )
      .subscribe({
        next: (res) => {
          this.categories.set([
            { id: 0, name: 'Any' },
            ...(res.trivia_categories || [])
          ]);
        },
        error: () => {
          this.categories.set([]);
        }
      });
  }

  // ===============================
  // Questions
  // ===============================
  requestQuestions(payload: { [k: string]: any }) {
    if (this.loading()) return;

    let params = new HttpParams().set(
      'amount',
      String(payload['amount'] ?? 10)
    );

    if (payload['category'] !== undefined) {
      params = params.set('category', String(payload['category']));
    }
    if (payload['difficulty'] !== undefined) {
      params = params.set('difficulty', payload['difficulty'].toLocaleLowerCase());
    }
    if (payload['type'] !== undefined) {
      params = params.set('type', payload['type']);
    }

    this.loading.set(true);

    this.http
      .get<{ response_code: number; results: any[] }>(
        `${this.baseApiUrl}api.php`,
        { params }
      )
      .subscribe({
        next: (res) => {
          this._questions.set(res.results || []);
        },
        error: () => {
          this._questions.set([]);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }



}
