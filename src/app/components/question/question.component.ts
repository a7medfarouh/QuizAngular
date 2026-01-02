import { Component, computed, OnInit, signal } from '@angular/core';
import { SetupService } from '../../serivces/setup.service';
import { QuestionService } from '../../serivces/question.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {

  // State Signals
  index = signal(0);
  selectedAnswerIndex = signal<number | null>(null);
  isAnswered = signal(false);
  showHint = signal(false);

  // Data Signals
  questions = this.questionService.quizQuestions; // Assuming this is a signal in your service

  currentQuestion = computed(() => {
    const questions = this.questions();
    return questions.length > 0 ? questions[this.index()] : null;
  });

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {}

  handleAnswerClick(idx: number): void {
    if (this.isAnswered()) return; // Prevent changing answer
    this.selectedAnswerIndex.set(idx);
    this.isAnswered.set(true);
  }

  handleNextQuestion(): void {
    if (this.index() < this.questions().length - 1) {
      this.index.update(v => v + 1);
      // Reset state for the new question
      this.isAnswered.set(false);
      this.selectedAnswerIndex.set(null);
      this.showHint.set(false);
    }else{
       this.redirectToResult();
    }
  }

  toggleHint(): void {
    this.showHint.update(v => !v);
  }
  private redirectToResult(): void {
    this.questionService.redirectToQuestion();
  }

}
