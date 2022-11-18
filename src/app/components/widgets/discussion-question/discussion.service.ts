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
export class DiscussionService {
  baseURL = environment.baseURL;
  DiscussionData = 'assets/mockApi/Discussion.json';
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }
  getQuestions(arg: number): any {
    return this.httpClient
      .get<any[]>(
        `${`${this.baseURL}discussion-question-api/get-discussion-question/${arg}`}`
      )
      .pipe(
        map((data: any) => {
          let myQuestionObject: any[] = [];
          data.DiscussionQuestions.forEach((element: any) => {
            let response = data.DiscussionQuestionResponses.filter(
              (item: any) =>
                item.DiscussionQuestionId === element.DiscussionQuestionId
            );
            myQuestionObject.push({
              WidgetId: data.WidgetId,
              TrainingFloId: data.TrainingFloId,
              DiscussionQuestionId: element.DiscussionQuestionId,
              Question: element.Question,
              response: response,
              isResponded: false,
            });
          });

          return myQuestionObject;
        }),
        catchError(this.handleError)
      );
  }
  saveDQResponse(data: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}discussion-question-api/save-discussionquestion-response`,
        data
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  deleteDQResponse(data: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}discussion-question-api/delete-discussionquestion-response`,
        data
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  handleError = (err: HttpErrorResponse): Observable<never> => {
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
  };
}
