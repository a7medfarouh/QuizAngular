import { computed, Injectable, signal } from '@angular/core';
import { SetupService } from './setup.service';
import { Router } from '@angular/router';
export interface QuizQuestion {
  question: string;
  answers?: AnswerOption[]; // kept optional for backward-compat
  options: AnswerOption[];
  hint?: string;
  correctAnswer: string;
  difficulty: string;
  category: string;
  type?: string;
}
export interface AnswerOption {
  text: string;
  isCorrect: boolean;
  rationale?: string;
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    score = signal(0);

    constructor(private setupService: SetupService,

    ) {}

    // Inside QuestionService class:
quizQuestions = computed((): QuizQuestion[] => {
  return this.setupService.questions().map(q => {
    const options: AnswerOption[] = [
      { text: q.correct_answer, isCorrect: true },
      ...q.incorrect_answers.map((ans: string) => ({ text: ans, isCorrect: false }))
    ];

    const shuffled = this.shuffle(options);

    return {
      question: q.question,
      answers: shuffled,
      options: shuffled,
      correctAnswer: q.correct_answer,
      difficulty: q.difficulty,
      category: q.category,
      type: q.type,
      hint: q.hint? q.hint : "No hint available"
    };
  });
});

// Update shuffle to handle objects
private shuffle(arr: any[]): any[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


}
