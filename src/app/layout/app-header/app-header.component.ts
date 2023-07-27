import { Component } from '@angular/core';
import { BasePageComponent } from 'src/app/library/components/base-page/base-page.component';
import { AccountService } from 'src/app/services/account.service';
import { SigninComponent } from 'src/app/pages/user/signin-component/signin.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent extends BasePageComponent {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  get user() {
    return this.authService.getUser();
  }
  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {
    super();
  }
  override ngOnInit() {}
  onSignIn() {
    const dialogRef = this.dialogService.openComponentModal(SigninComponent, {
      width: '640px',
      height: '400px',
      hasCloseButton: true,
      data: {
        name: 'majid',
        lastName: 'last name',
      },
    });

    // this.sbr.add(
    //   dialogRef.afterClosed().subscribe({
    //     next:(o : any)=> {
    //       this.sbr.unsubscribe();
    //     }
    //   })
    // );
  }
  onLogout() {
    this.accountService.logout();
  }
}
