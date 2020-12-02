import { UpdateTodoItemComponent } from './../update-todo-item/update-todo-item.component';
import { TodoHttpService } from './todo-http.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

import { HttpHeaders } from '@angular/common/http';
describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy};
  let todoStoreService: TodoStoreService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    const todoHttpService = new TodoHttpService(httpClientSpy as any);
    todoStoreService = new TodoStoreService();
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
    httpClientSpy.get.and.returnValue(of(todoStoreService.GetAll()));
    expect(service.todoItems.length).toBe(5);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should process error response when get exception ', fakeAsync( () => {
    //given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    // when
    service.todoItems;
    tick(500);

    // then
    expect(service.getAllErrorMessage).toBe('Get all failed because of web api error.');
  }));

  it('should create todoitems', () => {
    httpClientSpy.post.and.returnValue(of(new ToDoItem(1, 'sth', 'sth', true)));
    service.Create(new ToDoItem(1, 'sth', 'sth', true));
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should process error response when get exception doing post', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.post.and.returnValue(asyncError(errorResponse));

    // when
    service.Create(new ToDoItem(1, 'sth', 'sth', true));
    tick(500);

    // then
    expect(service.getAllErrorMessage).toBe('Post failed because of web api error.');
  }));

  it('should update todoitems', () => {
    httpClientSpy.put.and.returnValue(of(new ToDoItem(1, '2th', 'sth', true)));
    service.UpdateTodoItem(new ToDoItem(1, 'sth', 'sth', true));
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  it('should process error response when get exception doing put', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.put.and.returnValue(asyncError(errorResponse));

    // when
    service.UpdateTodoItem(new ToDoItem(1, 'sth', 'sth', true));
    tick(500);

    // then
    expect(service.getAllErrorMessage).toBe('Put failed because of web api error.');
  }));

  it('should delete todoitem by id', () => {
    const id = 1;
    httpClientSpy.delete.and.returnValue(of(new ToDoItem(1, '2th', 'sth', true)));
    service.DeleteTodoItem(id);
    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });

  it('should process error response when get exception doing delete', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.delete.and.returnValue(asyncError(errorResponse));

    // when
    service.DeleteTodoItem(1);
    tick(500);

    // then
    expect(service.getAllErrorMessage).toBe('Delete failed because of web api error.');
  }));

  it('should get todoitem by id', () => {
    const id = 1;
    const item = new ToDoItem(1, '2th', 'sth', true);
    httpClientSpy.get.and.returnValue(of(item));
    service.SetSelectedTodoItemId(id);
    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(service.selectedTodoItem).toBe(item);
  });

  it('should process error response when get exception doing get by id', fakeAsync(() => {
    //given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    // when
    service.SetSelectedTodoItemId(1);
    tick(500);

    // then
    expect(service.getAllErrorMessage).toBe('Get by id failed because of web api error.');
  }));
});
