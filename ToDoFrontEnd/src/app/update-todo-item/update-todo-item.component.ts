import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoItem } from '../model/ToDoItem';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.css']
})
export class UpdateTodoItemComponent implements OnInit {

  constructor(public todoItemService: TodoService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.todoItemService.SetUpdatingTodoItemId(Number(id));
  }

  public updateTodoItem(): void{
    this.todoItemService.UpdateTodoItem(this.todoItemService.updatingToDoItem);
  }
}
