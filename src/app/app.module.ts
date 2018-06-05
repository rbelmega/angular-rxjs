import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FakeHTTPService } from './fake-http.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [FakeHTTPService],
  bootstrap: [AppComponent],
})
export class AppModule {}
