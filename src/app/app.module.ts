import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, UrlSerializer } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from './library/components/components.module';
import { AppLayoutModule } from './layout/app-layout.module';
import { LowerCaseUrlSerializer } from './library/utility/lowercase-query-serializer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './library/utility/http.interceptor';
import { ServiceInjector } from './library/components/services/injector.service';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    ComponentsModule,
    AppLayoutModule,
    HomeModule,
  ],
  providers: [
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    // Create global Service Injector.
    ServiceInjector.injector = this.injector;
  }
}

/*
sudo docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Strong.Pwd-123' -p 1433:1433 --name sqledge -d mcr.microsoft.com/azure-sql-edge
sudo docker exec -it sqledge "bash"

*/
