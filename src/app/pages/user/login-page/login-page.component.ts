import { Component } from '@angular/core';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BasePageComponent {
  onClose() {}
}
