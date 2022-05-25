import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, map, repeatWhen, scan, Subject, tap } from 'rxjs';
import { Question, QuestionResponse } from '../models/question.model';

export interface Score{
  userName: string;
  score: number;
}

export const MAX_QUESTION_COUNT = 10;

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  public readonly userName$ = new BehaviorSubject<string>('');
  public readonly lives_counter$ = new BehaviorSubject<number>(3);
  public readonly game_finished$ = new Subject<boolean>();

  questionTextList$: string[] = [];

  public allQuestions$ = new BehaviorSubject<Question[]>([]);
  countQuestion$ = new BehaviorSubject<number>(0);
  public currentQuestionIndex$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getQuestion();
    this.game_finished$.subscribe(() => {
      this.router.navigateByUrl('result');
      return;
    });
    this.currentQuestionIndex$.subscribe((value) => {
      if (value + 1 >= this.countQuestion$.value ){
        this.getQuestion();
      }
      if (value >= 10){
        this.game_finished$.next(true);
      }
    });
    this.lives_counter$.subscribe((value) => {
      if (value <= 0){
        this.game_finished$.next(true);
      }
    });

  }

  shuffleAnswers(answers: string[]){
    const shuffledAnswers = answers.slice();
    for (var i = shuffledAnswers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffledAnswers[i];
        shuffledAnswers[i] = shuffledAnswers[j];
        shuffledAnswers[j] = temp;
      }
    return shuffledAnswers;
  }

  getQuestion(){
    return this.httpClient
      .get<QuestionResponse>(`https://opentdb.com/api.php?amount=1&encode=base64&type=multiple`)
      .pipe(
        map((questionResponse: QuestionResponse) => {
          const allAnswers = this.shuffleAnswers(
            [
              ...questionResponse.results[0].incorrect_answers,
              questionResponse.results[0].correct_answer
            ]);

          const _question = atob(questionResponse.results[0].question);
          const question: Question = {
            category: atob(questionResponse.results[0].category),
            type: atob(questionResponse.results[0].type),
            difficulty: atob(questionResponse.results[0].difficulty),
            question: _question,
            correct_answer: atob(questionResponse.results[0].correct_answer),
            incorrect_answers: questionResponse.results[0].incorrect_answers.map(a => atob(a)),
            all_Answers: allAnswers.map(a => atob(a)),
            unique: !this.questionTextList$.includes(_question)
          }
          return question;
        })
      ).subscribe((question: Question)=>{
          if (question.unique) {
            this.countQuestion$.next(this.countQuestion$.value + 1);
            this.allQuestions$.next([...this.allQuestions$.value, question]);
            this.questionTextList$.push(question.question);
          }else{
            this.getQuestion();
          }
      });
  }

  increaseCurrentQuestionIndex(){
    this.currentQuestionIndex$.next(this.currentQuestionIndex$.value + 1);
  }

  onClickAnswer(answer: string) {
    if (answer === this.allQuestions$.value[this.currentQuestionIndex$.value].correct_answer ){
      this.increaseCurrentQuestionIndex();
      return;
    }
    this.decreaseLivesCounter();
  }

  updateUserName(newUserName: string){
    this.userName$.next(newUserName);
  }

  decreaseLivesCounter(){
    this.lives_counter$.next(this.lives_counter$.value - 1);
  }

  clearState() {
    this.getQuestion();
    this.userName$.next('');
    this.lives_counter$.next(3);
    this.currentQuestionIndex$.next(0);
    this.allQuestions$.next([]);
    this.countQuestion$.next(0);
  }

}
