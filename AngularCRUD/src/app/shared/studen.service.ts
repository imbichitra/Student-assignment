import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudenService {

  ServerUrl = "http://localhost:3000/student/";
  errorData:{};
  httpHeader = new HttpHeaders({'Content-type':'application/json'});
  options = { headers: this.httpHeader };

  constructor(private formBuilder: FormBuilder,private http : HttpClient) { }

  form = this.formBuilder.group({
    id:null,
    name: ['', Validators.required],
    roll_no: ['', Validators.required],
    class: ['', Validators.required],
    address: ['', Validators.required]
  })

  students : Student[];

  initializeFormGroup() {
    this.form.setValue({
      id:null,
      name: '',
      roll_no: '',
      class: '',
      address: ''
    })
  }

  getStudents(){
    this.http.get<Student[]>(this.ServerUrl+"getAllStudent").pipe(
      catchError(this.handleError)
    ).subscribe(
      res=>{
        this.students = res;
        console.log(this.students);}
    )
  }

  registerStudent(){
    return this.http.post<any>(this.ServerUrl+"register",this.form.value,this.options).pipe(
      catchError(this.handleError)
    )
  }

  deleteStudent(roll_no){
    return this.http.delete<any>(this.ServerUrl+roll_no,this.options).pipe(
      catchError(this.handleError)
    )
  }

  removeStudent(roll_no){
    this.students = this.students.filter(student => student.roll_no !== roll_no);
  }

  populateForm(employee){
    this.form.setValue(employee);
  }

  updateStudent(){
    return this.http.put<any>(this.ServerUrl+"update",this.form.value,this.options).pipe(
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
