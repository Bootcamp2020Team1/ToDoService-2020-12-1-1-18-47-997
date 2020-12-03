import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoHttpService } from './todo-http.service';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
  let todoStoreService: TodoStoreService;
  let todoHttpService: TodoHttpService;

  beforeEach(() => {
    //  TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
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
    httpClientSpy.post.and.returnValue(of(newTodoItem));
    service.Create(newTodoItem);
    // then
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when create todoitems fail', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    // when
    service.Create(new ToDoItem(10, 'new todo', 'new todo description', false));
    tick(50);
    // then
    expect(service.postFailMessage).toBe('Post fail because webapi error');
  }));

  it('should update todo-item', () => {
    httpClientSpy.put.call(todoStoreService.Update(new ToDoItem(3, 'new todo', 'new todo description', false)));
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when update todoitems fail', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.put.and.returnValue(asyncError(errorResponse));
    // when
    service.UpdateTodoItem(new ToDoItem(10, 'new todo', 'new todo description', false));
    tick(50);
    // then
    expect(service.updateFailMessage).toBe('Update fail because webapi error');
  }));

  it('should delete todo item', () => {
    const id = 3;
    httpClientSpy.delete.call(todoStoreService.Delete(id));
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should process error response when delete todoitems fail', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.delete.and.returnValue(asyncError(errorResponse));
    // when
    service.DeleteTodoItem(2);
    tick(50);
    // then
    expect(service.deleteFailMessage).toBe('Delete fail because webapi error');
  }));

  it('should get special todo item', () => {
    const id = 3;
    const expectTodoItem = todoStoreService.FindById(id);
    httpClientSpy.get.and.returnValue(of(expectTodoItem));
    service.SetSelectedTodoItemId(id);
    expect(service.selectedTodoItem.id).toBe(id);
  });

  it('should process error response when get item by id fail', fakeAsync(() => {
    // given
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    // when
    service.SetSelectedTodoItemId(2);
    tick(50);
    // then
    expect(service.getItemFailMessage).toBe('Get by id fail because webapi error');
  }));
});
