import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultilineDotdotdotModule } from 'multiline-dotdotdot';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MultilineDotdotdotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
