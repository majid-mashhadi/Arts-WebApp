import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { ComponentsModule } from 'src/app/library/components/components.module';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [SigninComponent],
})
export class SigninModule {}
