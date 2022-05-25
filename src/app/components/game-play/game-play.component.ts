import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit, OnDestroy  {

  public question?: Question;

  constructor(private questionService: QuestionsService,  private router: Router) {
  }

  ngOnInit(){
    if (!this.questionService.userName$.value){
      this.router.navigateByUrl('start');
      return;
    }
    this.questionService.currentQuestionIndex$.subscribe((index)=>{
      this.question = this.questionService.allQuestions$.value[index];
    })
  }

  public onClickAnswer(answer: string) {
    this.questionService.onClickAnswer(answer);
  }


  ngOnDestroy(){
  }

}
