import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';

const routes: Routes = [
  { path: '', component: ListTodoitemComponent},
  { path: 'create', component: CreateTodoitemComponent},
  { path: 'update', component: UpdateTodoItemComponent},
  { path: 'detail', component: TodoitemDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
