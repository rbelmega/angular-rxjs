import { Component, OnDestroy } from '@angular/core';
import { FakeHTTPService } from './fake-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  timer: boolean;
  interval: boolean;

  constructor(private fakeHTTPService: FakeHTTPService) {
    this.fakeHTTPService
      .getAllSubjects()
      .subscribe(data => console.log('all subjects:', data));
    this.fakeHTTPService
      .getNormalizedSubjects()
      .subscribe(data => console.log('normalized subjects:', data));
    this.fakeHTTPService
      .getSubjectsBySpecialityID(4)
      .subscribe(data => console.log('subjects with specialityID 4:', data));
    this.fakeHTTPService
      .logItems()
      .subscribe(data => console.log('logger:', data));

    this.fakeHTTPService
      .takeFirst()
      .subscribe(data => console.log('first:', data));
    this.fakeHTTPService
      .getQuestionByLevel(1)
      .subscribe(data => console.log('question by level 1:', data));
    this.fakeHTTPService
      .getQuestionByLevel(2)
      .subscribe(data => console.log('question by level 2:', data));
    this.fakeHTTPService
      .getMergedQuestions([1, 2])
      .subscribe(data => console.log('merged questions:', data));
    this.fakeHTTPService
      .getSubjectData(1)
      .subscribe(data => console.log('subject data:', data));
  }

  ngOnDestroy() {}
}
