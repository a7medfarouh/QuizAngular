import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SetupComponent } from './components/setup/setup.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SetupComponent ,QuestionComponent,ResultComponent ,ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quiz';
}
