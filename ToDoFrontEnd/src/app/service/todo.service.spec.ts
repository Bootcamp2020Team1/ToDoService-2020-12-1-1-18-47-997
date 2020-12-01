import { HttpErrorResponse } from '@angular/common/http';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
  let todoStoreService: TodoStoreService;
  let todoHttpService: TodoHttpService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    todoStoreService = new TodoStoreService();
    todoHttpService = new TodoHttpService(httpClientSpy as any)
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
    const expectedAllTodoItems = todoStoreService.GetAll();
    httpClientSpy.get.and.returnValue(of(expectedAllTodoItems));
    expect(service.todoItems.length).toBe(5);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should catch error when get all todoitems fail', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse))
    service.todoItems;
    tick(0);
    expect(service.getAllFailMessage).toBe('Get all fail because of web api error');
  }));

  it('should create todo-item via mockhttp', () => {
    const newTodoItem = new ToDoItem(10, "new todo", "new todo description", false);
    httpClientSpy.post.and.returnValue(of(newTodoItem));
    service.Create(newTodoItem);
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should catch error when create todoitems fail', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Bad Request'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse))
    const newTodoItem = new ToDoItem(10, "new todo", "new todo description", false);
    service.Create(newTodoItem);
    tick(0);
    expect(service.createFailMessage).toBe('Create fail because of web api error');
  }));

  it('should update todo-item', () => {
    const newTodoItem = new ToDoItem(10, "new todo", "new todo description", false);
    httpClientSpy.put.and.returnValue(of(newTodoItem));
    service.UpdateTodoItem(newTodoItem);
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  it('should catch error when update todoitems fail', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Bad Request'
    });
    httpClientSpy.put.and.returnValue(asyncError(errorResponse))
    const newTodoItem = new ToDoItem(10, "new todo", "new todo description", false);
    service.UpdateTodoItem(newTodoItem);
    tick(0);
    expect(service.updateFailMessage).toBe('Update fail because of web api error');
  }));

  it('should delete todo item', () => {
    const id = 1;
    httpClientSpy.delete.and.returnValue(of(id));
    service.DeleteTodoItem(id);
    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });

  it('should catch error when delete todoitems fail', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.delete.and.returnValue(asyncError(errorResponse))
    const id = 1;
    service.DeleteTodoItem(id);
    tick(0);
    expect(service.deleteFailMessage).toBe('Delete fail because of web api error');
  }));

  it('should get special todo item', () => {
    const newTodoItem = new ToDoItem(10, "new todo", "new todo description", false);
    httpClientSpy.get.and.returnValue(of(newTodoItem));
    service.FindTodoItem(10);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should catch error when get todoitem by id fail', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse))
    const id = 1;
    service.FindTodoItem(id);
    tick(0);
    expect(service.getFailMessage).toBe('Get fail because of web api error');
  }));
});
