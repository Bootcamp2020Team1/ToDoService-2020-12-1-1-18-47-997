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
  public getAllFailMessage: string = '';
  public createFailMessage: string = '';
  public updateFailMessage: string = '';
  public deleteFailMessage: string = '';
  public getFailMessage: string = '';
  private _todoItems: Array<ToDoItem>;

  constructor(private todoStore: TodoStoreService,
    private todoHttpService: TodoHttpService) {
    this._todoItems = todoStore.GetAll();
    this.updatingToDoItem = new ToDoItem(-1, "", "", false);
    this.selectedTodoItem = new ToDoItem(-1, "", "", false);
    // this.currentId = this.todoItems.length;
  }

  public get todoItems(): Array<ToDoItem> {
    const allTodoItem = new Array<ToDoItem>();
    this.todoHttpService.GetAll().subscribe(todoItems => {
      allTodoItem.push(...todoItems)
    },
      error => {
        this.getAllFailMessage = 'Get all fail because of web api error';
      })
    return allTodoItem;
  }

  public SetUpdatingTodoItemId(id: number): void {
    this.todoHttpService.Get(id).subscribe(foundTodoItem => {
      if (foundTodoItem !== undefined) {
        this.updatingToDoItem = Object.assign({}, foundTodoItem);
      }
    })


  }

  public Create(todoItem: ToDoItem) {
    this.todoHttpService.Create(todoItem).subscribe(() => {
      this.createFailMessage = '';
    },
      error => {
        this.createFailMessage = 'Create fail because of web api error';
      })
  }

  public UpdateTodoItem(updateTodoItems: ToDoItem): void {
    this.todoHttpService.Update(updateTodoItems).subscribe(item => {
      this.updatingToDoItem = item;
      this.updateFailMessage = '';
    },
      error => {
        this.updateFailMessage = 'Update fail because of web api error';
      });
  }

  public DeleteTodoItem(id: number): void {
    this.todoHttpService.Delete(id).subscribe(() => {
      this.deleteFailMessage = '';
    },
      error => {
        this.deleteFailMessage = 'Delete fail because of web api error';
      });
  }

  public FindTodoItem(id: number): void {
    this.todoHttpService.Get(id).subscribe(item => {
      this.selectedTodoItem = item;
      this.getFailMessage = '';
    },
      error => {
        this.getFailMessage = 'Get fail because of web api error';
      });
  }

  // public SetSelectedTodoItemId(id: number): void {
  //   this.selectedTodoItem = this.todoStore.FindById(id);
  // }
}
