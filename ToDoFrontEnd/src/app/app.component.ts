import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoFrontEnd';

  constructor(private route: Router) {
  }

  goToCreatePage(): void {
    this.route.navigate(['/create']);
  }

  goToIndex(): void {
    this.route.navigate(['']);
  }

}
