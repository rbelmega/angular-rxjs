import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    const interval$ = interval(1000);

    interval$.subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    console.log('app-timer has been destroyed');
  }
}
