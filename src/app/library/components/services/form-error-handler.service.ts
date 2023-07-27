import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class FormErrorHandlerService {
  errors: BehaviorSubject<any>;
  label : string;
  constructor(
  ) { 
    this.errors = new BehaviorSubject({});
  }
  setup(form: FormGroup, controlName: string, label : string) {
    this.label = label;
    form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      ).subscribe(() => {
        if (form.invalid) {
          this.showErrors(form.controls, controlName, label);
        } 
      });
  }


  private showErrors(controls: any,  controlName: string, label : string) { 
    const errorObject =  {} as any;

    const control = controls[controlName];
    if (control.hasError('required')){
      errorObject[controlName] = `${label} is required.`;
    }
    if (control.hasError('email')){
      errorObject[controlName] = `${label} is not valid.`;
    }
    if ( control.hasError('minlength')){
      const {requiredLength} = control.errors.minlength
      errorObject[controlName] = `${label} minimum length is: ${requiredLength}`;
    }
    if ( control.hasError('maxlength')){
      const {requiredLength} = control.errors.maxlength
      errorObject[controlName] = `${label} maximum length is: ${requiredLength}`;
    }
    this.errors.next(errorObject);
  }  

}
