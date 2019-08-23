import { Component, OnInit,Inject} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  taskForm: FormGroup;
  isSubmitted = false;
  rollNo = "";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<AssignTaskComponent>,
    private taskService:TaskService) { 
      this.rollNo = data
    }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      message:['',Validators.required]
    });
  }

  onClose() {
    //this.studentService.form.reset();
    //this.studentService.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.taskForm.value);
    var obj = {
      ["student_id"]: this.rollNo,
      ["assigned_student_id"]: "0034",
      ["message"]: this.taskForm.value.message,
    }
    console.log(obj);
    this.taskService.assignTask(obj).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }
}
