import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { MatInput } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
})
export class InputBoxComponent extends BaseComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @Input() maxLength: number = 0;
  @Input() minLength: number = 0;
  @Input() showPrefix = false;
  @Output() onEnterKey = new EventEmitter<string>();

  override ngOnInit(): void {
    super.ngOnInit();
  }
  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  keydown() {
    this.onEnterKey.emit(this.formGroup.get(this.controlName)?.value);
  }
}
