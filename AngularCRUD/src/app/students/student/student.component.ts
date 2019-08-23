import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StudenService } from 'src/app/shared/studen.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<StudentComponent>,
    private studentService: StudenService,
    private toastr: ToastrService) { }

  statusMessage = '';
  isError = false;
  isDisable = false;

  ngOnInit() {
    console.log(this.studentService.form.get('id').value)
    if (this.studentService.form.get('id').value) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }

  onClose() {
    this.studentService.form.reset();
    this.studentService.initializeFormGroup();
    this.dialogRef.close();
  }

  get() {
    return this.isError ? 'alert alert-danger' : 'alert alert-success';
  }

  onSubmit() {
    if (this.studentService.form.valid) {
      if (!this.studentService.form.get('id').value) {
        this.insertData();
      } else {
        this.update();
      }
    }
  }

  insertData() {
    this.studentService.registerStudent().subscribe(
      res => {
        this.resetForm(res);
        this.toastr.success('Student Registered succfully', '');
      },
      error => {
        this.isError = true;
        this.statusMessage = error.message.error
      }
    );
  }

  update() {
    console.log(this.studentService.form.value)
    this.studentService.updateStudent().subscribe(
      res => {
        this.resetForm(res);
        this.toastr.success('Record Updated succfully', '');
      },
      err => {
        this.isError = true;
        this.statusMessage = err.message.error
      }
    )
  }

  resetForm(res) {
    this.isError = false;
    this.statusMessage = res.status;
    this.studentService.form.reset();
    this.studentService.initializeFormGroup();
    this.onClose();
    this.studentService.getStudents();
  }
}
