import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: { get: jasmine.Spy };
  let todoStoreService: TodoStoreService;
  let todoHttpService: TodoHttpService;

  beforeEach(() => {
    //  TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    todoStoreService = new TodoStoreService();
    todoHttpService = new TodoHttpService(httpClientSpy as any);

    service = new TodoService(todoStoreService, todoHttpService);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TodoService);
  });

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
  function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todoitems', () => {
    const expectAllTodoItems = todoStoreService.GetAll();
    httpClientSpy.get.and.returnValue(of(expectAllTodoItems));
    expect(service.todoItems.length).toBe(5);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when get all todoitems fail', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    // when
    service.todoItems;
    tick(50);
    // then
    expect(service.getAllFailMessage).toBe('Get all fail because webapi error');
  }));

  it('should create todo-item via mockhttp', () => {
    const newTodoItem = new ToDoItem(10, 'new todo', 'new todo description', false);
    service.Create(newTodoItem);
    expect(service.todoItems.length).toBe(6);
    expect(service.todoItems[5].id === newTodoItem.id);
    expect(service.todoItems[5].title === newTodoItem.title);
    expect(service.todoItems[5].description === newTodoItem.description);
    expect(service.todoItems[5].isDone === newTodoItem.isDone);
  });

  it('should update todo-item', () => {
    const updateTodoItem = service.todoItems[0];
    updateTodoItem.description = 'updated description';
    updateTodoItem.title = 'updated title';
    updateTodoItem.isDone = true;
    service.UpdateTodoItem(updateTodoItem);
    expect(service.todoItems.length).toBe(5);
    expect(service.todoItems[0].description).toBe(updateTodoItem.description);
    expect(service.todoItems[0].title).toBe(updateTodoItem.title);
    expect(service.todoItems[0].isDone).toBe(updateTodoItem.isDone);
  });

  it('should delete todo item', () => {
    const id = service.todoItems[0].id;
    service.DeleteTodoItem(id);
    expect(service.todoItems.length).toBe(4);
  });

  it('should get special todo item', () => {
    const id = service.todoItems[4].id;
    const expectTodoItem = todoStoreService.FindById(id);
    httpClientSpy.get.and.returnValue(of(expectTodoItem));
    service.SetSelectedTodoItemId(id);
    expect(service.selectedTodoItem.id).toBe(id);
  });
});
