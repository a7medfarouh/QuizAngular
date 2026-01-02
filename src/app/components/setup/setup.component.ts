import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SetupService } from '../../serivces/setup.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent implements OnInit {

  setupForm = this.fb.group({
    category: [0, Validators.required],
    difficulty: ['Any', Validators.required],
    type: ['Any', Validators.required],
    amount: [10, [Validators.required, Validators.min(1), Validators.max(50)]],
  });

  constructor(
    private fb: FormBuilder,
    public setupService: SetupService
  ) {}

  ngOnInit(): void {
    this.setupService.loadCategories();
  }

  setDifficulty(level: string) {
    this.setupForm.patchValue({ difficulty: level });
  }

  startChallenge() {
    if (this.setupForm.invalid) {
      this.setupForm.markAllAsTouched();
      return;
    }

    this.setupService.requestQuestions(this.buildPayload());
  }

  private buildPayload(): { [k: string]: any } {
    const payload = { ...this.setupForm.value };

    if (payload.category == 0) delete payload.category;
    if (payload.difficulty === 'Any') delete payload.difficulty;
    if (payload.type === 'Any') delete payload.type;

    return payload;
  }
}
