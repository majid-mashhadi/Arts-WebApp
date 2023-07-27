import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-email-control',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent extends BaseComponent {
  override ngOnInit(): void {
    super.ngOnInit();
  }
}
