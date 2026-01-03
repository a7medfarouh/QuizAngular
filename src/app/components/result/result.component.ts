import { Component } from '@angular/core';
import { QuestionService } from '../../serivces/question.service';
import { RedirectService } from '../../serivces/redirect.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {

  constructor(
    public questionService: QuestionService,
    private redirectService: RedirectService
  ) { }

  reset(): void {
    this.questionService.score.set(0);
    this.redirectService.redirectToSetup();
  }
}
