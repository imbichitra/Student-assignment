import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentComponent } from '../student/student.component';
import { StudenService } from 'src/app/shared/studen.service';
import { ToastrService } from 'ngx-toastr';
import { AssignTaskComponent } from 'src/app/assign-task/assign-task.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private dialog:MatDialog,private studentService:StudenService,
    private toastr:ToastrService) { }

  
  ngOnInit() {
    this.studentService.getStudents();
  }

  onRegister(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent,dialogConfig);
  }

  onDelete(roll_no:string){
    this.studentService.deleteStudent(roll_no).subscribe(
      res=>{console.log(res)
        this.studentService.removeStudent(roll_no);
        this.toastr.info('Student deleted succfully','');
      },
      err=>console.log(err)
    )
  }

  onEdit(student,i){
    var obj = Object.assign({},student)
    obj.id=i+1;
    this.studentService.populateForm(obj);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent,dialogConfig)
  }

  assignTask(roll_no){
    //var obj = Object.assign({},student)
    //obj.id=i+1;
    //this.studentService.populateForm(obj);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    dialogConfig.data=roll_no;
    this.dialog.open(AssignTaskComponent,dialogConfig)
  }

}
