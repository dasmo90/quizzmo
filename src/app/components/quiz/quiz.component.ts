import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Question} from '../../api/Question';
import {Answer} from '../../api/Answer';
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
    console.log(this.activeIndex);
    const q = this.question;
    const answers = q.otherAnswers.concat(q.correctAnswer);
    this.answers = ArrayUtil.shuffle(answers);
  }

  exit(): void {
    this.router.navigate(['']);
  }

  get question(): Question {
    return this.questions[this.activeIndex];
  }
}
