import { Routes } from '@angular/router';
import { QuestionComponent } from './components/question/question.component';
import { SetupComponent } from './components/setup/setup.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component:SetupComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'result', component: ResultComponent }
];
