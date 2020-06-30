import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Question} from '../../api/question';
import {Answer} from '../../api/answer';
import {ArrayUtil} from '../../utils/array.util';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  title = '';
  subtitle = '';
  activeIndex = -1;
  questions: Question[] = [];
  answers: Answer[] = [];
  correctAnswers = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.apiService.fetchQuiz(id).subscribe(value => {
      this.subtitle = value.description;
      this.questions = value.questions;
    });
  }

  next(): void {
    this.activeIndex++;
    const question = this.question;
    if (question) {
      const answers = question.otherAnswers.concat(question.correctAnswer);
      this.answers = ArrayUtil.shuffle(answers);
    }
  }

  select(answer: Answer): void {
    const question = this.question;
    if (answer.text === question.correctAnswer.text) {
      this.correctAnswers++;
    }
    this.next();
  }

  exit(): void {
    this.router.navigate(['']);
  }

  get question(): Question {
    return this.questions[this.activeIndex];
  }
}
