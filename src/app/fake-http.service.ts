import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, first, tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { zip } from 'rxjs/internal/observable/zip';

const subjects = [
  {
    id: 1,
    subject_name: 'Math',
    specialityID: 4,
  },
  {
    id: 2,
    subject_name: 'Logic',
    specialityID: 4,
  },
  {
    id: 3,
    subject_name: 'Philosophy',
    specialityID: 5,
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

  getAllSubjects() {
    return of(...subjects);
  }

  getNormalizedSubjects() {
    return this.getAllSubjects().pipe(
      map(item => ({
        id: item.id,
        specialityID: item.specialityID,
        subjectName: item.subject_name,
      }))
    );
  }

  getSubjectsBySpecialityID(specialityID) {
    return this.getNormalizedSubjects().pipe(
      filter(item => item.specialityID === specialityID)
    );
  }

  logItems() {
    return this.getNormalizedSubjects().pipe(
      tap(item => console.log('Logging item:', item))
    );
  }

  takeFirst() {
    return this.getNormalizedSubjects().pipe(first());
  }

  getQuestionByLevel(level) {
    return of(questions[level]);
  }

  getMergedQuestions(range) {
    const questionsPool = range.map(this.getQuestionByLevel);

    return forkJoin(questionsPool);
  }

  getSubjectData(subjectId) {
    return this.getSubjectsById(subjectId).pipe(
      switchMap(subject => this.mergeSubjectAndQuestions(subject))
    );
  }

  private getSubjectsById(subjectId) {
    return this.getNormalizedSubjects().pipe(
      filter(item => item.id === subjectId)
    );
  }

  private mergeSubjectAndQuestions(subject) {
    return this.getMergedQuestions([1, 2]).pipe(
      map((questions: any) =>
        questions.map(question => {
          question.filter(q => q.subjectID === subject);
        })
      ),
      map(questions => ({
        subject,
        questions,
      }))
    );
  }
}
