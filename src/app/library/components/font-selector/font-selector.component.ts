import { Component } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-font-selector',
  templateUrl: './font-selector.component.html',
  styleUrls: ['./font-selector.component.scss'],
})
export class FontSelectorComponent extends BaseComponent {
  selectedFont: FormControl = new FormControl('');
  fonts: string[] = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Helvetica',
    'Courier',
  ];
}
