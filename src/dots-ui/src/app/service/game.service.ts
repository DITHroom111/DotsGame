import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {of} from "rxjs";

@Injectable()
export class GameService {
  private apiUrl: string = '/games/';

  constructor(private http: HttpClient) {
  }

  startGame(): Observable<number> {
    //return this.http.post<number>(this.apiUrl, {}, {});
    return of(0);
  }
}
