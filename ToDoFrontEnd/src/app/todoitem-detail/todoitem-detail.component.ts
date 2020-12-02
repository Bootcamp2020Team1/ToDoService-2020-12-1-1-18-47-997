import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todoitem-detail',
  templateUrl: './todoitem-detail.component.html',
  styleUrls: ['./todoitem-detail.component.css']
})
export class TodoitemDetailComponent implements OnInit {
  //todoItemService: any;

  constructor(public todoService: TodoService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.todoService.SetSelectedTodoItemId(Number(id));
  }
}
