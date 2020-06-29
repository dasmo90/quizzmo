import {Question} from './Question';

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}
