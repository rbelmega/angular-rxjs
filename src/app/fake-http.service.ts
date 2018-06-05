import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

const products = [
  {
    id: 1,
    subject_name: 'Math',
    typeID: 4,
  },
  {
    id: 2,
    subject_name: 'Logic',
    typeID: 4,
  },
  {
    id: 3,
    subject_name: 'Philosophy',
    typeID: 5,
  },
];
const questions = {
  1: [
    {
      id: 11,
      subjectID: 1,
      level: 1,
      question: 'fake question 1',
      answer: 'fake answer 1',
    },
    {
      id: 12,
      subjectID: 2,
      level: 1,
      question: 'WRONG fake question 2',
      answer: 'fake answer 2',
    },
    {
      id: 13,
      subjectID: 1,
      level: 1,
      question: 'fake question 3',
      answer: 'fake answer 3',
    },
  ],
  2: [
    {
      id: 21,
      subjectID: 1,
      level: 2,
      question: 'fake question 1',
      answer: 'fake answer 1',
    },
    {
      id: 22,
      subjectID: 1,
      level: 2,
      question: 'fake question 2',
      answer: 'fake answer 2',
    },
    {
      id: 23,
      subjectID: 1,
      level: 2,
      question: 'fake question 3',
      answer: 'fake answer 3',
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class FakeHTTPService {
  constructor() {}

  getAllProducts() {
    return of(...products);
  }

  getNormalizedProducts() {
    return this.getAllProducts().pipe(
      map(item => ({
        id: item.id,
        typeID: item.typeID,
        subjectName: item.subject_name,
      }))
    );
  }

  getProductsByTypeId(typeID) {
    return this.getNormalizedProducts().pipe(
      filter(item => item.typeID === typeID)
    );
  }

  getProductsById(subjectId) {
    return this.getNormalizedProducts().pipe(
      filter(item => item.id === subjectId)
    );
  }

  getQuestionByLevel(level) {
    return of(questions[level]);
  }

  getMergedQuestions(range) {
    const questionsPool = range.map(this.getQuestionByLevel);

    return forkJoin(questionsPool);
  }

  mergeSubjectAndQuestions(subject) {
    return this.getMergedQuestions([1, 2]).pipe(
      map(questions => ({
        subject,
        questions,
      }))
    );
  }

  getSubjectData(subjectId) {
    return this.getProductsById(subjectId).pipe(
      switchMap(subject => this.mergeSubjectAndQuestions(subject))
    );
  }
}
