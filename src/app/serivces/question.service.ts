import { Injectable, computed, signal } from '@angular/core';
import { SetupService } from './setup.service';

export interface AnswerOption {
  text: string;
  isCorrect: boolean;
  rationale?: string;
}

export interface QuizQuestion {
  question: string;
  options: AnswerOption[];
  hint?: string;
  correctAnswer: string;
  difficulty: string;
  category: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  score = signal(0);

  quizQuestions = computed<QuizQuestion[]>(() =>
    this.setup.questions().map(q => {
      const options: AnswerOption[] = [
        { text: q.correct_answer, isCorrect: true },
        ...q.incorrect_answers.map((a: string) => ({
          text: a,
          isCorrect: false
        }))
      ];

      return {
        question: q.question,
        options: this.shuffle(options),
        correctAnswer: q.correct_answer,
        difficulty: q.difficulty,
        category: q.category,
      type: q.type,
      hint: q.hint
      };
    })
  );

  constructor(private setup: SetupService) {}

  private shuffle(arr: AnswerOption[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}
