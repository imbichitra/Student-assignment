import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: FormGroup;

  isSubmitted = false;
  textForSubmit = "Submit"
  errorMessage = '';
  isError = false;

  constructor(private service:UserService,
    private formBuilder : FormBuilder) { }


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
    this.service.signUp(this.user.value).subscribe(
      res =>{
        this.isSubmitted = false;
        this.textForSubmit = "Submit";
        this.errorMessage = 'User created successfully';
        this.isError = false;
        console.log(res);
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
