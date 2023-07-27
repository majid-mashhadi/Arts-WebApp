import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-password-control',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent extends BaseComponent {
  passwordType: string = 'password';
  passwordIcon: string = 'visibility';

  onPasswordTypeChange() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'visibility_off';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'visibility';
    }
  }
}
