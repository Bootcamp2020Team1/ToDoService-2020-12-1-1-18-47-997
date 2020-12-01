import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

  constructor(private httpClient: HttpClient) { }

  public GetAll(): Observable<Array<ToDoItem>> {
    return this.httpClient.get<Array<ToDoItem>>('https://localhost:5001/ToDoItem');
  }
}
