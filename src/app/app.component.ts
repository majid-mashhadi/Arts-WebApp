import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import {
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'WebSite';
  constructor(
    private router: Router,
    private dialogService: MatDialog,
    titleService: Title
  ) {
    const title = environment.title;
    titleService.setTitle(title);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationSkipped
        )
      )
      .subscribe((event) => {
        this.dialogService.closeAll();
      });
  }
}
