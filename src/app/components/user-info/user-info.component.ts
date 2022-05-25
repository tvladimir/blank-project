import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo: FormGroup;
  errorMessage: string;

  constructor(fb: FormBuilder, private questionService: QuestionsService, private router: Router)
  {
    this.errorMessage = '';
    this.userInfo = fb.group({
        userName: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.questionService.clearState();
  }

  onSubmit(form: FormGroup) {
    this.errorMessage = '';
    if (! this.userInfo.value.userName){
      this.errorMessage = 'Please, enter your name';
      return;
    }
    this.questionService.updateUserName(this.userInfo.value.userName);
    this.router.navigate(['game'])
  }

}
