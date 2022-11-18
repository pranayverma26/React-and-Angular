import { Injectable } from '@angular/core';
// import { api_constant } from './../../../shared/app.api.path';
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
export class TrainingService {
  baseURL = environment.baseURL;
  buttonSelected = 1;
  headers = new HttpHeaders();
  search: any;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }

  getTrainingMat(
    trainingFloId: number,
    recordingWidgetId: number = 0,
    courseId: number = 0
  ): any {
    return this.httpClient
      .get<any[]>(
        `${this.baseURL}learning-content-api/get-learning-content/${trainingFloId}/${recordingWidgetId}/${courseId}`
      )
      .pipe(
        map((data: any[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  // getTraningMat():any{
  //   return this,this.httpClient.get<any[]>(`${this.baseURL}${api_constant.GET_TRAINING_MATERIAL}`).pipe(
  //     map((data:any[])=>{
  //       return data;
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

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
