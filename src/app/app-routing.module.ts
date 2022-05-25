import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePlayComponent } from './components/game-play/game-play.component';
import { ResultsComponent } from './components/results/results.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: UserInfoComponent },
  { path: 'game', component: GamePlayComponent },
  { path: 'result', component: ResultsComponent },
  { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
