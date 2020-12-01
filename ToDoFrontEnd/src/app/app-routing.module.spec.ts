import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { routes } from './app-routing.module';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';

describe("Router", () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        UpdateTodoItemComponent,
        ListTodoitemComponent,
        TodoitemDetailComponent,
        CreateTodoitemComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it('navigate to "" redirects to /', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/');
  }))
});