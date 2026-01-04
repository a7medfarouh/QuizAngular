import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { SetupService } from '../../serivces/setup.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent implements OnInit {

  categories: { id: number; name: string }[] = [];

  setupForm = this.fb.group({
    category: [0],
    difficulty: ['Any'],
    type: ['Any'],
    amount: [10, [Validators.min(1), Validators.max(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public setupService: SetupService
  ) {}

  ngOnInit() {
    this.setupService.fetchCategories().subscribe(res => {
      this.categories = [{ id: 0, name: 'Any' }, ...res.trivia_categories];
    });

    this.setupService.fetchQuestions$().subscribe(res => {
      this.setupService.questions.set(res.results);
      this.router.navigate(['/question']);
    });
  }

  setDifficulty(level: string) {
    this.setupForm.patchValue({ difficulty: level });
  }

  startChallenge() {
    const payload = { ...this.setupForm.value };

    if (payload.category == 0) delete payload.category;
    if (payload.difficulty === 'Any') delete payload.difficulty;
    if (payload.type === 'Any') delete payload.type;

    this.setupService.requestQuestions(payload);
  }
}
