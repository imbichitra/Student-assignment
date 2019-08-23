import { Injectable } from '@angular/core';
import {  HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  ServerUrl = "http://localhost:3000/task/";
  errorData:{};
  httpHeader = new HttpHeaders({'Content-type':'application/json'});
  options = { headers: this.httpHeader };


  constructor(private http : HttpClient) { }

  assignTask(obj){
    return this.http.post<any>(this.ServerUrl,obj,this.options).pipe(
      catchError(this.handleError)
    )
  }

  getTask(roll_no){
    return this.http.get<Task[]>(this.ServerUrl+roll_no,this.options).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      statusCode: error.status,
      message: error.error
    };
    return throwError(this.errorData);
  }
}
