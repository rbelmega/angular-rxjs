import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css'],
})
export class IntervalComponent implements OnInit, OnDestroy {
  alive: boolean = true;

  constructor() {
    console.log('app-interval has been initialized');
  }

  ngOnInit() {
    //timerOne emits first value at 1s, then once every 4s
    const timerOne = timer(1000, 4000);
    //timerTwo emits first value at 2s, then once every 4s
    const timerTwo = timer(2000, 4000);
    //timerThree emits first value at 3s, then once every 4s
    const timerThree = timer(3000, 4000);

    //when one timer emits, emit the latest values from each timer as an array
    const combined = combineLatest(timerOne, timerTwo, timerThree).pipe(
      takeWhile(() => this.alive)
    );

    const subscribe = combined.subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        /*
          Example:
        timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
        timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
        timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
      */
        console.log(
          `
Timer One Latest: ${timerValOne},
Timer Two Latest: ${timerValTwo},
Timer Three Latest: ${timerValThree}
          `
        );
      }
    );
  }

  ngOnDestroy() {
    console.log('app-interval has been destroyed');
    this.alive = false;
  }
}
