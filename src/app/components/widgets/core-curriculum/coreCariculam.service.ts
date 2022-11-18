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
export class CoreCariculamService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }

  getTopics(trainingFloId: number, id: number = 0): any {
    return this.httpClient
      .get<any>(
        `${this.baseURL}session-course-api/courses-detail/${trainingFloId}/${id}`
      )
      .pipe(
        map((data: any) => {
          let sortedArray = data.sort(
            (a: any, b: any) => a.CourseId - b.CourseId
          );
          return sortedArray;
        }),
        catchError(this.handleError)
      );
  }

  saveTopicRatings(ratingDetail: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}session-course-api/save-user-feedback`,
        ratingDetail
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getCourseRating(trainingFloId: number, widgetId: number = 0): any {
    return this.httpClient
      .get<any>(
        `${this.baseURL}session-course-api/courses-rating-detail/${trainingFloId}/${widgetId}`
      )
      .pipe(
        map((data: any) => {
          let sortedArray = data.sort(
            (a: any, b: any) => b.CourseId - a.CourseId
          );
          return sortedArray;
        }),
        catchError(this.handleError)
      );
  }

  deleteTopicComment(ratingDetail: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}session-course-api/delete-user-feedback`,
        ratingDetail
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
