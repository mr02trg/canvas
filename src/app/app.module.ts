import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { CircleCanvasComponent } from './circle-canvas/circle-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    CircleCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
