import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  isSubmitted = false;
  textForSubmit = "Submit"
  errorMessage = '';
  isError = false;

  constructor(private service:UserService,
    private formBuilder : FormBuilder,
    private router:Router) { }


  ngOnInit() {
    this.user = this.formBuilder.group({
      user_id:['',Validators.required],
      password:['',Validators.required]
    });
  }

  get formControls() { return this.user.controls; }
  get(){
    return this.isError ? 'alert alert-danger' : 'alert alert-success';  
  }

  onSubmit(){
    this.isSubmitted = true;
    this.textForSubmit = " Submitting..."
    this.errorMessage = '';
    if(this.user.invalid){
      this.isSubmitted = false;
      this.textForSubmit = " Submit"
      return;
    }
    this.service.login(this.user.value).subscribe(
      res =>{
        this.isSubmitted = false;
        this.textForSubmit = "Submit";
        this.errorMessage = 'Login successfully';
        this.isError = false;
        console.log(res);
        this.router.navigateByUrl('/students');
      },
      err => {
        this.isSubmitted = false;
        this.textForSubmit = "Submit"
        this.errorMessage = err.message.error;
        this.isError = true;
        
        console.log(err.statusCode);
        console.log(err.message.error);
      }
    )  
  }
}
