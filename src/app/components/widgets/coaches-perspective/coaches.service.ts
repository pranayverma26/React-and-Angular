import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CoachesService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders();
  search: any;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }
  getCoachesPers() {
    return this.httpClient
      .get<any[]>(`${this.baseURL}assets/mockApi/Coaches.json`)
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getCoachData(trainingFloId: number, widgetId: number): any {
    return this.httpClient
      .get<any[]>(
        `${this.baseURL}coach-api/session-coach-presepectives/${trainingFloId}/${widgetId}`
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
