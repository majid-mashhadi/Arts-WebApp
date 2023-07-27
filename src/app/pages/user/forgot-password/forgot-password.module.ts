import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ComponentsModule } from 'src/app/library/components/components.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule, ComponentsModule],
})
export class ForgotPasswordModule {}
