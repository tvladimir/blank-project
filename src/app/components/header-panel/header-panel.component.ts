import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { MAX_QUESTION_COUNT, QuestionsService } from 'src/app/services/questions.service';


@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {
  faHeart = faHeart;
  userName$: Subject<string> = this.questionService.userName$;
  lives$: Subject<number> = this.questionService.lives_counter$;

  currentQuestionIndex:number = 0;
  max_count = MAX_QUESTION_COUNT;


  constructor( private questionService: QuestionsService) {
    this.questionService.currentQuestionIndex$.subscribe((index)=>{
      this.currentQuestionIndex = index;
    })
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
  }

}
