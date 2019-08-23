import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';


import { StudentComponent } from './students/student/student.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudenService } from './shared/studen.service';
import { UserService } from './shared/user.service';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { TaskService } from './shared/task.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponent,
    StudentComponent,
    StudentListComponent,
    AssignTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [UserService,StudenService,TaskService],
  bootstrap: [AppComponent],
  entryComponents:[StudentComponent,AssignTaskComponent]
})
export class AppModule { }
