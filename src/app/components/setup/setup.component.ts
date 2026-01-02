import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Subject, of, Subscription } from 'rxjs';
import { exhaustMap, catchError, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent implements OnInit {
  setupForm: FormGroup;
  categories: Array<{ id: number; name: string }> = [];
  questions: any[] = [];
  private fetchTrigger = new Subject<{ [k: string]: any }>();
  private fetchSubscription: Subscription | null = null;
  isFetching = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.setupForm = this.fb.group({
      category: [0, Validators.required],
      difficulty: ['Any', Validators.required],
      type: ['Any', Validators.required],
      amount: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http
      .get<{ trivia_categories: Array<{ id: number; name: string }> }>(
        'https://opentdb.com/api_category.php'
      )
      .subscribe({
        next: (res) => {
          const remote = res.trivia_categories || [];
          this.categories = [{ id: 0, name: 'Any' }, ...remote];
          if (!this.setupForm.value.category) {
            this.setupForm.patchValue({ category: 0 });
          }
        },
        error: (err) => {
          console.error('Failed to load categories', err);
          this.categories = [];
        },
      });
  }

  setDifficulty(level: string) {
    this.setupForm.patchValue({ difficulty: level });
  }

  startChallenge() {
    if (this.setupForm.invalid) {
      this.setupForm.markAllAsTouched();
      return;
    }
    const payload = this.buildPayload();
    this.fetchQuestions(payload);
  }

  buildPayload(): { [k: string]: any } {
    const raw = { ...this.setupForm.value };
    const payload: { [k: string]: any } = { ...raw };

    if (payload['category'] === 0) {
      delete payload['category'];
    }

    if (payload['difficulty'] === 'Any') {
      delete payload['difficulty'];
    }

    if (payload['type'] === 'Any') {
      delete payload['type'];
    }

    return payload;
  }
  fetchQuestions(payload?: { [k: string]: any }) {
    const p = payload ?? this.buildPayload();

    if (!this.fetchSubscription) {
      this.fetchSubscription = this.fetchTrigger
        .pipe(
          exhaustMap((p) => {
            let params = new HttpParams().set('amount', String(p['amount'] ?? 10));

            if (p['category'] !== undefined) {
              params = params.set('category', String(p['category']));
            }

            if (p['difficulty'] !== undefined) {
              params = params.set('difficulty', p['difficulty']);
            }

            if (p['type'] !== undefined) {
              params = params.set('type', p['type']);
            }

            const url = 'https://opentdb.com/api.php';
            this.isFetching = true;
            return this.http.get<{ response_code: number; results: any[] }>(url, { params }).pipe(
              catchError((err) => {
                console.error('Failed to fetch questions', err);
                return of({ response_code: 1, results: [] });
              }),
              finalize(() => {
                this.isFetching = false;
              })
            );
          })
        )
        .subscribe((res) => {
          this.questions = res.results || [];
          console.log('Fetched questions', this.questions);
        });
    }

    this.fetchTrigger.next(p);
  }
}
