import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import {GridComponent} from "./grid/grid.component";
import {PlaceComponent} from "./grid/place/place.component";
import {HttpClientModule} from "@angular/common/http";
import {GameService} from "./service/game.service";
import {GameComponent} from "./game/game.component";
import {ScoreComponent} from "./score/score.component";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    PlaceComponent,
    GameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
