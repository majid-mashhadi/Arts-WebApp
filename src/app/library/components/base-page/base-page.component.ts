import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AppHttpService } from '../services/http.service';
import { ServiceInjector } from '../services/injector.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { appRoutes } from 'src/app/library/utility/app-routes';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnDestroy {
  appRoutes = appRoutes;

  sbr: Subscription;
  loadingService: LoadingService;
  httpService: AppHttpService;
  router: Router;
  route: ActivatedRoute;
  dialogService: DialogService;

  constructor() {
    this.sbr = new Subscription();
    this.loadingService = ServiceInjector.injector.get(LoadingService);
    this.httpService = ServiceInjector.injector.get(AppHttpService);
    this.router = ServiceInjector.injector.get(Router);
    this.route = ServiceInjector.injector.get(ActivatedRoute);
    this.dialogService = ServiceInjector.injector.get(DialogService);
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.sbr.unsubscribe();
  }
  handleError(error: HttpErrorResponse) {
    if (error.status == 404 || error.status == 400) {
    }
  }
}
