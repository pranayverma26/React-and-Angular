import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { KeyTakeAway } from './interface/keytakeaway.interface';

@Injectable({
  providedIn: 'root',
})
export class KeyTakeawayService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders();
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${btoa(environment.authKey)}`
    );
  }

  getKeyTakeAways(tfId: number): any {
    return this.httpClient
      .get<any[]>(
        `${this.baseURL}session-course-api/course-key-takeaway/${tfId}`
      )
      .pipe(
        map((data: KeyTakeAway[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  saveKeyTakeAways(keyData: any): any {
    return this.httpClient
      .post<any>(
        `${this.baseURL}session-course-api/course-key-takeaway`,
        keyData
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
