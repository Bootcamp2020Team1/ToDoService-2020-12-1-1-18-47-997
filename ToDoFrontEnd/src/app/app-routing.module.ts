import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: "", component: ListTodoitemComponent },
  { path: "create", component: CreateTodoitemComponent },
  { path: "detail/:id", component: TodoitemDetailComponent },
  { path: "edit/:id", component: UpdateTodoItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
