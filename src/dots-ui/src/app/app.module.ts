import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GridComponent} from "./grid/grid.component";
import {PlaceComponent} from "./grid/place/place.component";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
