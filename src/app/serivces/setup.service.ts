import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, exhaustMap, catchError, finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private apiUrl = 'https://opentdb.com/api.php';

  questions = signal<any[]>([]);
  loading = signal(false);

  hasQuestions = computed(() => this.questions().length > 0);

  private fetchTrigger$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  fetchCategories() {
    return this.http.get<{
      trivia_categories: { id: number; name: string }[]
    }>('https://opentdb.com/api_category.php');
  }

  fetchQuestions$() {
    return this.fetchTrigger$.pipe(
      exhaustMap(payload => {
        let params = new HttpParams().set('amount', payload.amount ?? 10);

        if (payload.category) params = params.set('category', payload.category);
        if (payload.difficulty) params = params.set('difficulty', payload.difficulty);
        if (payload.type) params = params.set('type', payload.type);

        this.loading.set(true);

        return this.http.get<{ results: any[] }>(this.apiUrl, { params }).pipe(
          catchError(() => of({ results: [] })),
          finalize(() => this.loading.set(false))
        );
      })
    );
  }

  requestQuestions(payload: any) {
    this.fetchTrigger$.next(payload);
  }
}
