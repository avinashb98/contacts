import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IContact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = 'https://hidden-tundra-66710.herokuapp.com/api/contact/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.contactUrl + 'all')
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getContact(id): Observable<IContact> {
    const body = { id: id };
    console.log(body);
    return this.http.post<IContact>(this.contactUrl, body)
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
