import { Component, signal, computed } from '@angular/core';
import { QuestionService } from '../../serivces/question.service';
import { RedirectService } from '../../serivces/redirect.service';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {

  index = signal(0);
  selectedAnswerIndex = signal<number | null>(null);
  isAnswered = signal(false);
  showHint = signal(false);
  aiHint = signal<string | null>(null);

  questions = this.questionService.quizQuestions;

  currentQuestion = computed(() =>
    this.questions()[this.index()] ?? null
  );

  constructor(public questionService: QuestionService,
    private redirectService: RedirectService
  ) {}

  handleAnswerClick(index: number, isCorrect: boolean) {
    if (this.isAnswered()) return;

    this.selectedAnswerIndex.set(index);
    this.isAnswered.set(true);

    if (isCorrect) {
      this.questionService.score.update(s => s + 1);
    }
  }

  handleNextQuestion() {
    if (this.index() + 1 < this.questions().length) {
      this.index.update(i => i + 1);
      this.reset();
    } else {
       this.redirectToResult();
      }
  }

  toggleHint() {
    this.showHint.update(v => !v);
  }

  private reset() {
    this.selectedAnswerIndex.set(null);
    this.isAnswered.set(false);
    this.showHint.set(false);
    this.aiHint.set(null);
  }

  private redirectToResult(): void {
    this.redirectService.redirectToResult();
  }

}
