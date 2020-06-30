import {Answer} from './answer.model';

export interface Question {
  text: string;
  imageUrl: string;
  correctAnswer: Answer;
  otherAnswers: Answer[];
}
