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
export class FeedbackService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getFeedBackCount(param: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}feedback-widget-api/get-feedback-count`,
        param
      )
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  saveFeedbacks(feedback: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}feedback-widget-api/save-feedback-response`,
        feedback
      )
      .pipe(
        map((data: any) => {
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
