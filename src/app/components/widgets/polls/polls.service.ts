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
export class PollsService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }

  getPolls(tfId: number, widgetId: number): any {
    return this.httpClient
      .get<any[]>(
        `${this.baseURL}poll-question-api/get-poll-detail/${widgetId}/${tfId}`
      )
      .pipe(
        map((data: any[]) => {
          let pollData: any[] = [];
          data.forEach((element: any) => {
            let newItem = { ...element, disabled: false, selectedPollId:0 };
            pollData.push(newItem);
          });
          return pollData;
        }),
        catchError(this.handleError)
      );
  }
  getPollsResponse(tfId: number, widgetId: number): any {
    return this.httpClient
      .get<any[]>(
        `${this.baseURL}poll-question-api/get-poll-response/${widgetId}/${tfId}`
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  savePolls(data: any): any {
    return this.httpClient
      .post<any>(`${this.baseURL}poll-question-api/save-poll-response`, data)
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  viewPollResilt(data: any): any {
    return this.httpClient
      .get<any>(`${this.baseURL}assets/mockApi/polls.json`)
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getResponded(): any {
    return this.httpClient
      .get<any>(`${this.baseURL}assets/mockApi/polls.json`)
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
