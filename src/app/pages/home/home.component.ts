import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BasePageComponent {
  data: any;
  text: any;
  constructor(private homeService: HomeService) {
    super();
  }
  override ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.loadingService.open('Loading new image');
    forkJoin([
      this.homeService.getRandom(),
      this.homeService.getRandomText(),
    ]).subscribe({
      next: (response: any) => {
        this.data = response[0];
        this.text = response[1];
        this.loadingService.close();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.loadingService.close();
      },
    });
  }
}
