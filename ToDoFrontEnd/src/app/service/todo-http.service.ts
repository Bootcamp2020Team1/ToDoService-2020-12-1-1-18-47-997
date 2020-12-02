import { ToDoItem } from './../model/ToDoItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {
  constructor(private httpClient: HttpClient) { }
  public getAll(): Observable<Array<ToDoItem>> {
    return this.httpClient.get<Array<ToDoItem>>('https://localhost:44309/ToDoItem');
  }
  public create(toDoItem: ToDoItem): Observable<ToDoItem> {
    return this.httpClient.post<ToDoItem>('https://localhost:44309/ToDoItem', toDoItem, httpOptions);
  }
  public update(toDoItem: ToDoItem): Observable<ToDoItem> {
    return this.httpClient.put<ToDoItem>('https://localhost:44309/ToDoItem', toDoItem, httpOptions);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`https://localhost:44309/ToDoItem?id=${id}`);
  }
  public getById(id: number): Observable<ToDoItem> {
    return this.httpClient.get<ToDoItem>(`https://localhost:44309/ToDoItem/${id}`);
  }
}
