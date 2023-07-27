import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { AccountService } from 'src/app/services/account.service';
import { appRoutes } from 'src/app/library/utility/app-routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BasePageComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService) {
    super();
  }
  override ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test@gmail.com', [Validators.required, Validators.email]],
    });
  }
  onSendEmail() {
    const { value } = this.form;
    this.loadingService.open('Please wait...');
    this.sbr.add(
      this.accountService.forgotPassword(value.email).subscribe({
        next: (response: any) => {
          this.loadingService.close();
          const ref = this.dialogService.openMessageModel(
            'Information',
            response.message,
            {}
          );
          ref.afterClosed().subscribe({
            next: () => {
              this.router.navigate([appRoutes.signin]);
            },
          });
        },
      })
    );
  }
}
