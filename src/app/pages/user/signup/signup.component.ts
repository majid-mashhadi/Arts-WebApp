import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BasePageComponent implements OnInit {
  form: FormGroup;
  error: any;
  constructor(private fb: FormBuilder, private accountService: AccountService) {
    super();
  }
  override ngOnInit() {
    this.form = this.fb.group({
      email: ['test1@gmail.com', [Validators.required, Validators.email]],
      firstName: [
        'first name',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(128),
        ],
      ],
      lastName: [
        'last name ',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(128),
        ],
      ],
      password: ['Test123!@#', [Validators.required]],
    });
  }
  onCreate() {
    this.error = null;
    const { value } = this.form;
    this.loadingService.open('Please wait while creating the account');
    this.sbr.add(
      this.accountService
        .signup(value.email, value.password, value.firstName, value.lastName)
        .subscribe({
          next: (response: any) => {
            this.loadingService.close();
          },
          error: (err: HttpErrorResponse) => {
            this.loadingService.close();
            this.error = err.error.message;
          },
        })
    );
  }
}
