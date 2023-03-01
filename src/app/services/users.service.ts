import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3000/api/users';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Token': 'N2JjNmQ2NDkzODE3NDQ0ODgwOGM3ZGZlYWJiN2FhNjNmNjY2N2Q0YzljYzQ0MjViOGM3ZGZlYWJiN2E=',
    })
  }

  constructor(private http: HttpClient) { }

  users(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  userById(user: Users): Observable<Users> {
    return this.http.get<Users>(this.url +'/'+ user._id, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, JSON.stringify(user), this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(user: Users): Observable<Users> {
    return this.http.put<Users>(this.url +'/'+ user._id, JSON.stringify(user), this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(user: Users): Observable<Users> {
    return this.http.delete<Users>(this.url +'/'+user._id, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
