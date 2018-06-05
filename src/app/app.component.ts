import { Component, OnDestroy } from '@angular/core';
import { FakeHTTPService } from './fake-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(private fakeHTTPService: FakeHTTPService) {
    this.fakeHTTPService
      .getAllProducts()
      .subscribe(data => console.log('all products:', data));
    // this.fakeHTTPService
    //   .getNormalizedProducts()
    //   .subscribe(data => console.log('normalized products:', data));
    // this.fakeHTTPService
    //   .getProductsByTypeId(4)
    //   .subscribe(data => console.log('products with 4:', data));
    // this.fakeHTTPService
    //   .getQuestionByLevel(1)
    //   .subscribe(data => console.log('question by level 1:', data));
    // this.fakeHTTPService
    //   .getQuestionByLevel(2)
    //   .subscribe(data => console.log('question by level 2:', data));
    // this.fakeHTTPService
    //   .getMergedQuestions([1, 2])
    //   .subscribe(data => console.log('merged questions:', data));
    // this.fakeHTTPService
    //   .getSubjectData(1)
    //   .subscribe(data => console.log('subject data:', data));
  }

  ngOnDestroy() {}
}
