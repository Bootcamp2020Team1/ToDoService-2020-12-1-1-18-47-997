import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { routes } from './app-routing.module';

describe("Router", () => {
  let location: Location;
  let route: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        TodoitemDetailComponent,
        UpdateTodoItemComponent,
        ListTodoitemComponent,
        CreateTodoitemComponent,
      ]
    });

    route = TestBed.get(Router);
    location = TestBed.get(Location);
    route.initialNavigation();
  });

  it('navigate to "" redirects to /', fakeAsync(() => {
    route.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/');
  }));

  it('navigate to "edit/1" redirects to /edit/1', fakeAsync(() =>{
    route.navigate(['edit', 1]);
    tick(50);
    expect(location.path()).toBe('/edit/1');
  }));

  it('navigate to "detail/1" redirects to /detail/1', fakeAsync(() =>{
    route.navigate(['detail', 1]);
    tick(50);
    expect(location.path()).toBe('/detail/1');
  }));

  it('navigate to "create" redirects to /create', fakeAsync(() =>{
    route.navigate(['create']);
    tick(50);
    expect(location.path()).toBe('/create');
  }));
});
