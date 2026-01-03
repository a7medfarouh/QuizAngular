import { Routes } from '@angular/router';
import { QuestionComponent } from './components/question/question.component';
import { SetupComponent } from './components/setup/setup.component';
import { ResultComponent } from './components/result/result.component';
import { questionGuard } from './guard/question.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component:SetupComponent },
  { path: 'question', component: QuestionComponent , canActivate: [questionGuard] },
  { path: 'result', component: ResultComponent , canActivate: [questionGuard] }
];
