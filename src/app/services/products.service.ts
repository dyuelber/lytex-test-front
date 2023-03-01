import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/api/products';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Token': 'N2JjNmQ2NDkzODE3NDQ0ODgwOGM3ZGZlYWJiN2FhNjNmNjY2N2Q0YzljYzQ0MjViOGM3ZGZlYWJiN2E=',
    })
  }

  constructor(private http: HttpClient) { }

  products(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url, this.options)
      .pipe(
        catchError(this.handleError)
      )
  }

  productById(product: Products): Observable<Products> {
    return this.http.get<Products>(this.url +'/'+ product._id, this.options)
      .pipe(
        catchError(this.handleError)
      )
  }

  create(product: Products): Observable<Products> {
    return this.http.post<Products>(this.url, JSON.stringify(product), this.options)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(product: Products): Observable<Products> {
    return this.http.put<Products>(this.url +'/'+ product._id, JSON.stringify(product), this.options)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(product: Products) {
    return this.http.delete<Products>(this.url +'/'+ product._id, this.options)
      .pipe(
        catchError(this.handleError)
      )
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
