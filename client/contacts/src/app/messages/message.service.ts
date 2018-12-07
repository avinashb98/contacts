import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IMessage } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private MessageUrl = 'https://hidden-tundra-66710.herokuapp.com/api/contact/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.MessageUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
