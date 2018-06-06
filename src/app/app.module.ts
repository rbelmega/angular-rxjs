import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FakeHTTPService } from './fake-http.service';
import { TimerComponent } from './timer/timer.component';
import { IntervalComponent } from './interval/interval.component';

@NgModule({
  declarations: [AppComponent, TimerComponent, IntervalComponent],
  imports: [BrowserModule],
  providers: [FakeHTTPService],
  bootstrap: [AppComponent],
})
export class AppModule {}
