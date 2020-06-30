import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Question} from '../../models/question.model';
import {Answer} from '../../models/answer.model';
import {ArrayUtil} from '../../utils/array.util';
import {StringUtil} from '../../utils/string.util';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  title = '';
  subtitle = '';
  activeIndex = -1;
  shown = false;
  questions: Question[] = [];
  answers: Answer[] = [];
  answer = '';
  correctAnswers = 0;
  bonusAnswers = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title');
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.apiService.fetchQuiz(id).subscribe(value => {
      this.subtitle = value.description;
      const questions = value.questions.map(question => {
        if (!question.otherAnswers) {
          question.otherAnswers = value.questions
          .map(other => other.correctAnswer)
          .filter(otherAnswer => otherAnswer.text !== question.correctAnswer.text);
        }
        return question;
      });
      this.questions =  ArrayUtil.shuffle(questions);
    });
  }

  show(): void {
    this.shown = true;
  }

  next(): void {
    this.shown = false;
    this.answer = '';
    this.activeIndex++;
    const question = this.question;
    if (question) {
      const answers = ArrayUtil.shuffle(question.otherAnswers).slice(0, 4).concat(question.correctAnswer);
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

  giveAnswer(): void {
    const question = this.question;
    if (StringUtil.clean(this.answer) === StringUtil.clean(question.correctAnswer.text)) {
      this.correctAnswers++;
      this.bonusAnswers++;
      this.next();
    } else {
      this.show();
    }
  }

  exit(): void {
    this.router.navigate(['']);
  }

  get question(): Question {
    return this.questions[this.activeIndex];
  }
}
