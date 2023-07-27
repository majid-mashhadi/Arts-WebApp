import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponentsModule } from 'src/app/components/app-components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AppComponentsModule,
  ],
})
export class HomeModule {}
