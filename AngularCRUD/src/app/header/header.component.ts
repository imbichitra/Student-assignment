import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task';
import { log } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  task : Task[];
  noOfNotification = 0;
  constructor(private taskServie:TaskService) { }

  ngOnInit() {
    this.taskServie.getTask("az00125").subscribe(
      res=>{
        this.task = res;
        this.noOfNotification = this.task.length;
        console.log(this.task)
      },
      err=>console.log(err)
    )
  }

}
