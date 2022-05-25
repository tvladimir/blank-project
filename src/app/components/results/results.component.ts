import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService, Score } from 'src/app/services/questions.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  scoreList: Score[] = [];

  constructor(  private questionService: QuestionsService, private router: Router ) {
  }

  ngOnInit(){
    if (!this.questionService.userName$.value){
      this.router.navigateByUrl('start');
      return;
    }
    this.updateScore();
  }

  calculateScore(): number {
    return (this.questionService.currentQuestionIndex$.value + 1)  * 10 + this.questionService.lives_counter$.value;
  }

  updateScore() {
    const storageScoreList = localStorage.getItem('GAME_SCORE_LIST');
    this.scoreList = JSON.parse(storageScoreList || '[]' );
    this.scoreList.push(
      {
        userName: this.questionService.userName$.value,
        score: this.calculateScore()
      })
    this.scoreList = this.scoreList.sort((a,b) => b.score - a.score);
    localStorage.setItem('GAME_SCORE_LIST', JSON.stringify(this.scoreList));
  }

  startNewGame(){
    this.router.navigateByUrl('start');
  }

}
