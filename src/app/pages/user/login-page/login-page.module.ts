import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { SigninModule } from 'src/app/pages/user/signin-component/signin.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, SigninModule],
  exports: [LoginPageComponent, LoginPageRoutingModule],
})
export class LoginPageModule {}
// ng g m login-page --route login --module app.module
