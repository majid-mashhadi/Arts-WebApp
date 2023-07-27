import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
  providers: [MatDialog],
})
export class BaseComponent {
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() containerClass: string;
  @Input() required: boolean;
  @Input() color: ThemePalette;
  @Input() appearance: MatFormFieldAppearance = 'outline';

  private errors: any;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.formGroup.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.errors = {};
        if (this.formGroup.invalid) {
          this.showErrors();
        }
      });
  }

  private showErrors() {
    const { controls } = this.formGroup;
    const control = controls[this.controlName]!;
    if (control.hasError('required')) {
      this.errors[this.controlName] = `${this.label} is required.`;
    }
    if (control.hasError('email')) {
      this.errors[this.controlName] = `${this.label} is not valid.`;
    }
    if (control.errors && control.hasError('minlength')) {
      const { requiredLength } = control.errors['minlength'];
      this.errors[
        this.controlName
      ] = `${this.label} minimum length is: ${requiredLength}`;
    }
    if (control.errors && control.hasError('maxlength')) {
      const { requiredLength } = control.errors['maxlength'];
      this.errors[
        this.controlName
      ] = `${this.label} maximum length is: ${requiredLength}`;
    }
    if (control.errors && control.hasError('min')) {
      console.log(control.errors['min']);
      const { min } = control.errors['min'];
      this.errors[this.controlName] = `${this.label} minimum value is: ${min}`;
    }
    if (control.errors && control.hasError('max')) {
      const { max } = control.errors['max'];
      this.errors[this.controlName] = `${this.label} maximum value is: ${max}`;
    }
  }
  getError() {
    return this.errors && this.errors[this.controlName];
  }
}
