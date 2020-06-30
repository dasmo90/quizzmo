import {Answer} from './answer';

export interface Question {
  text: string;
  imageUrl: string;
  correctAnswer: Answer;
  otherAnswers: Answer[];
}
