import { Component, signal, computed } from '@angular/core';
import { QuestionService } from '../../serivces/question.service';
import { RedirectService } from '../../serivces/redirect.service';
import { HintService } from '../../serivces/hint.service';

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
    private redirectService: RedirectService,
    private hintService: HintService
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

 async toggleHint(): Promise<void> {
  if (this.isAnswered()) return;

  // لو الـ hint ظاهر → اقفليه
  if (this.showHint()) {
    this.showHint.set(false);
    return;
  }

  const q = this.currentQuestion();
  if (!q) return;

  // لو فيه hint ثابت في السؤال
  if (q.hint && q.hint.trim() !== '') {
    this.showHint.set(true);
    return;
  }

  // لو AI hint متجاب قبل كده
  if (this.aiHint()) {
    this.showHint.set(true);
    return;
  }

  // نجيب hint من AI
  this.aiHint.set('Thinking of a smart hint...');
  this.showHint.set(true);

  const hint = await this.hintService.getAIHint(q);
  this.aiHint.set(hint);
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
