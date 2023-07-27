import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { SelectItem } from './select-item.interface';

@Component({
  selector: 'app-select-control',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseComponent {
  @Input() items: SelectItem[] = [];
}
