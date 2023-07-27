import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninModule } from 'src/app/pages/user/signin-component/signin.module';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { ComponentsModule } from 'src/app/library/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SigninModule, ComponentsModule, RouterModule],
  exports: [SignupComponent, SignupRoutingModule],
})
export class SignupModule {}
// ng g m login-page --route login --module app.module
