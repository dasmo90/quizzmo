import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {QuizTeaser} from '../../models/quiz-teaser.model';
import {Quiz} from '../../models/quiz.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'quizzmo';
  items: QuizTeaser[];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  goToQuiz(quiz: QuizTeaser): void {
    this.router.navigate(['/quiz', {id: quiz.id, title: quiz.name}]);
  }

  private fetchData(): void {
    this.apiService.fetchQuizzes().subscribe(
      (data) => {
        this.items = data;
      }, (err) => {
        console.log(err);
      }
    );
  }

}
