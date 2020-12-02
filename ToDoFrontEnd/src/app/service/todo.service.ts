import { ToDoItem } from './../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { Injectable } from '@angular/core';
import { TodoStoreService } from './todo-store.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public updatingToDoItem: ToDoItem;
  public selectedTodoItem: ToDoItem;
  public getAllErrorMessage: string = '';

  constructor(private todoStore: TodoStoreService, private todoHttpService: TodoHttpService) {
    this.updatingToDoItem = new ToDoItem(-1, '', '', false);
    this.selectedTodoItem = new ToDoItem(-1, '', '', false);
  }

  public get todoItems(): Array<ToDoItem> {
    const allTodoItems = new Array<ToDoItem>();
    this.todoHttpService.getAll().subscribe(
      todoItems => {
        this.getAllErrorMessage = '';
        allTodoItems.push(...todoItems);
      },
      error => this.getAllErrorMessage = 'Get all failed because of web api error.'
    );
    return allTodoItems;
  }

  public SetUpdatingTodoItemId(id: number): void {
    this.todoHttpService.getById(id).subscribe(
      item => {
        this.updatingToDoItem = item;
        this.getAllErrorMessage = '';
      },
      error => {
        this.getAllErrorMessage = 'Get by id failed because of web api error.';
      }
    );
  }

  public Create(todoItem: ToDoItem) {
    const newTodoItem = Object.assign({}, todoItem);
    this.todoHttpService.create(newTodoItem).subscribe(
      item => {
        this.getAllErrorMessage = '';
      },
      error => this.getAllErrorMessage = 'Post failed because of web api error.'
    );
  }

  public UpdateTodoItem(updateTodoItems: ToDoItem): void {
    this.todoHttpService.update(updateTodoItems).subscribe(
      item => {
        this.getAllErrorMessage = '';
      },
      error => this.getAllErrorMessage = 'Put failed because of web api error.'
    );
  }

  public DeleteTodoItem(id: number): void{
    this.todoHttpService.delete(id).subscribe(
      item => {
        this.getAllErrorMessage = '';
      },
      error => {
        this.getAllErrorMessage = 'Delete failed because of web api error.';
      }
    );
  }

  public SetSelectedTodoItemId(id: number): void{
    this.todoHttpService.getById(id).subscribe(
      item => {
        this.selectedTodoItem = item;
        this.getAllErrorMessage = '';
      },
      error => {
        this.getAllErrorMessage = 'Get by id failed because of web api error.';
      }
    );
  }
}
