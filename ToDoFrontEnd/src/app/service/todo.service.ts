import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public updatingToDoItem: ToDoItem;
  public selectedTodoItem: ToDoItem;
  private currentId: number = 0;
  public getAllFailMessage: string;
  public postFailMessage: string;
  public updateFailMessage: string;
  public deleteFailMessage: string;

  private _todoItems: Array<ToDoItem>;

  constructor(private todoStore: TodoStoreService,
    private todoHttpService: TodoHttpService) {
    this._todoItems = todoStore.GetAll();
    this.updatingToDoItem = new ToDoItem(-1, '', '', false);
    this.selectedTodoItem = new ToDoItem(-1, '', '', false);
    this.getAllFailMessage = '';
    this.postFailMessage = '';
    this.updateFailMessage = '';
    this.deleteFailMessage = '';
    // this.currentId = this.todoItems.length;
  }

  public get todoItems(): Array<ToDoItem> {
    const allToDoItem = new Array<ToDoItem>();
    this.todoHttpService.GetAll().subscribe(todoItems => {
      allToDoItem.push(...todoItems);
      this.getAllFailMessage = '';
    },
    error => {
      this.getAllFailMessage = 'Get all fail because webapi error';
    });
    return allToDoItem;
  }

  public SetUpdatingTodoItemId(id: number): void {
    const foundTodoItem = this.todoStore.FindById(id);
    if (foundTodoItem !== undefined) {
      this.updatingToDoItem = Object.assign({}, foundTodoItem);
    }
  }

  public Create(todoItem: ToDoItem) {
    this.todoHttpService.Create(todoItem).subscribe(todoItem => {
      console.log(todoItem);
      this.postFailMessage = '';
    },
    error => {
      this.postFailMessage = 'Post fail because webapi error';
    });
  }

  public UpdateTodoItem(updateTodoItems: ToDoItem): void {
    this.todoHttpService.Update(updateTodoItems).subscribe(todoitem => {
      console.log(todoitem);
      this.updateFailMessage = '';
    },
      error => {
        this.updateFailMessage = 'update fail because webapi error';
      });
  }

  public DeleteTodoItem(id: number): void {
    this.todoHttpService.Delete(id);
  }

  public SetSelectedTodoItemId(id: number): void {
    this.selectedTodoItem = this.todoStore.FindById(id);
  }
}
