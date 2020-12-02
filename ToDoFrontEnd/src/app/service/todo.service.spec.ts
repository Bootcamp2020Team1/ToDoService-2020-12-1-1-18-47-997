import { TodoHttpService } from './todo-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { asyncScheduler, defer, of } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};
  let todoStoreService: TodoStoreService;
  let todoHttpService: TodoHttpService

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    todoStoreService = new TodoStoreService();

    todoHttpService = new TodoHttpService(httpClientSpy as any);
    service = new TodoService(todoStoreService, todoHttpService);
    //TestBed.configureTestingModule({});
    //service = TestBed.inject(TodoService);

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
    const exceptAllTodoItems = todoStoreService.GetAll();
    httpClientSpy.get.and.returnValue(of(exceptAllTodoItems));
    expect(service.todoItems.length).toBe(5);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when get all todoitems', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    // when
    // tslint:disable-next-line: no-unused-expression
    service.todoItems;
    tick(0);
    // then
    expect(service.getAllFailMessage).toBe('get all fail because web API error');
  }));

  it('should create todo-item via mockhttp', () => {
    const newTodoItem = new ToDoItem(10, 'new todo', 'new todo description', false);
    httpClientSpy.post.and.returnValue(of(newTodoItem));
    service.Create(newTodoItem);
    // then
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
  it('should process error response when create new todoitem via post', fakeAsync(() => {
    // given
    const newTodoItem = new ToDoItem(10, 'new todo', 'new todo description', false);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    // when
    // tslint:disable-next-line: no-unused-expression
    service.Create(newTodoItem);
    tick(0);
    // then
    expect(service.createFailMessage).toBe('create fail because web API error');
  }));
  it('should update todo-item', () => {
    const updateTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    updateTodoItem.description = 'updated description';
    updateTodoItem.title = 'updated title';
    updateTodoItem.isDone = true;
    httpClientSpy.put.and.returnValue(of(updateTodoItem));
    service.UpdateTodoItem(updateTodoItem);
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when update via put', fakeAsync(() => {
    // given
    const updateTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.put.and.returnValue(asyncError(errorResponse));
    // when
    // tslint:disable-next-line: no-unused-expression
    service.UpdateTodoItem(updateTodoItem);
    tick(50);
    // then
    expect(service.updateFailMessage).toBe('update fail because web API error');
  }));

  it('should delete todo item', () => {
    const id = 0;
    const deleteTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    httpClientSpy.delete.and.returnValue(of(deleteTodoItem));
    service.DeleteTodoItem(id);
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });
  it('should process error response when delete via delete', fakeAsync(() => {
    // given
    const deleteTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.delete.and.returnValue(asyncError(errorResponse));
    // when
    // tslint:disable-next-line: no-unused-expression
    service.DeleteTodoItem(deleteTodoItem.id);
    tick(50);
    // then
    expect(service.deleteFailMessage).toBe('delete fail because web API error');
  }));
  it('should get special todo item', () => {
    const id = 0;
    const findTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    httpClientSpy.get.and.returnValue(of(findTodoItem));
    service.GetItemById(id);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when get item by id via get', fakeAsync(() => {
    // given
    const findTodoItem = new ToDoItem(0, 'new todo', 'new todo description', false);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    // when
    // tslint:disable-next-line: no-unused-expression
    service.GetItemById(findTodoItem.id);
    tick(50);
    // then
    expect(service.findFailMessage).toBe('find fail because web API error');
  }));
});
