import {Question} from './question.model';

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}
