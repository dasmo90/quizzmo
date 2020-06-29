import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../api/Quiz';
import {QuizTeaser} from '../api/QuizTeaser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  fetchQuizzes(): Observable<QuizTeaser[]> {
    return new Observable<QuizTeaser[]>(observer => {
      observer.next([
        {
          id: 1,
          name: 'Nachrichtensprecher',
          description: 'Kennst du die Nachrichtensprecher der ARD?'
        }
      ]);
      observer.complete();
    });
  }

  fetchQuiz(id: number): Observable<Quiz> {
    return new Observable<Quiz>(observer => {
      observer.next(
        {
          id: 1,
          name: 'Nachrichtensprecher',
          description: 'Kennst du die Nachrichtensprecher der ARD?',
          questions: [
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Jan_Hofer_1.jpg',
              text: '',
              correctAnswer: {
                text: 'Jan Hofer',
                imageUrl: null,
              },
              otherAnswers: [{
                text: 'Jens Riewa',
                imageUrl: null,
              }, {
                text: 'Thorsten Schröder',
                imageUrl: null,
              }]
            }
          ]
        }
      );
      observer.complete();
    });
  }
}
