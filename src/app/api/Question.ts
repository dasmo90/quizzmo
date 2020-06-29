import {Answer} from './Answer';

export interface Question {
  text: string;
  imageUrl: string;
  correctAnswer: Answer;
  otherAnswers: Answer[];
}
