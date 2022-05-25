import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './components/userInfo/user-info/user-info.component';
import { GamePlayComponent } from './components/gamePlay/game-play/game-play.component';
import { ResultsComponent } from './components/results/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderPanelComponent } from './components/header-panel/header-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionsService } from './services/questions.service';

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    GamePlayComponent,
    ResultsComponent,
    HeaderPanelComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
