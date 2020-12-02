import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-create-todoitem',
  templateUrl: './create-todoitem.component.html',
  styleUrls: ['./create-todoitem.component.css']
})
export class CreateTodoitemComponent implements OnInit {

  constructor(public todoService: TodoService) {
    this.toDoItem = new ToDoItem(0, "1", "2", false);
  }

  public toDoItem: ToDoItem;

  ngOnInit(): void {
  }

  public createToDoItem(): void {
    this.todoService.Create(this.toDoItem);

  }

}
