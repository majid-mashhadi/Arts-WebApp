import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBodyComponent } from './app-body/app-body.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../library/components/components.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppHeaderComponent,
    AppBodyComponent,
    AppFooterComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [AppHeaderComponent, AppBodyComponent, AppFooterComponent],
})
export class AppLayoutModule {}
