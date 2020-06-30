import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../api/Quiz';
import {QuizTeaser} from '../api/quiz-teaser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  fetchQuizzes(): Observable<QuizTeaser[]> {
    return this.httpClient.get('assets/data/quizzes.json') as Observable<QuizTeaser[]>;
  }

  fetchQuiz(id: number): Observable<Quiz> {
    return this.httpClient.get(`assets/data/quizzes/${id}.json`) as Observable<Quiz>;
  }
}
