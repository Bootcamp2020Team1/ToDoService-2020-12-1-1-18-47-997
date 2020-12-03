import { AppRoutingModule, routes } from './app-routing.module';
import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UpdateTodoItemComponent } from './update-todo-item/update-todo-item.component';
import { TodoitemDetailComponent } from './todoitem-detail/todoitem-detail.component';
import { CreateTodoitemComponent } from './create-todoitem/create-todoitem.component';
import { ListTodoitemComponent } from './list-todoitem/list-todoitem.component';

describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        UpdateTodoItemComponent,
        TodoitemDetailComponent,
        CreateTodoitemComponent,
        ListTodoitemComponent,
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
  }));

  it('navigate to "edit/1" should redirects to /edit/1', fakeAsync(() => {
    router.navigate(['edit/1']);
    tick(50);
    expect(location.path()).toBe('/edit/1');
  }));

  it('navigate to "detail/1" should redirects to /detail/1', fakeAsync(() => {
    router.navigate(['detail/1']);
    tick(50);
    expect(location.path()).toBe('/detail/1');
  }));
});
