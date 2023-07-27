import { Injectable } from '@angular/core';
import { AppHttpService } from '../library/components/services/http.service';
import { Subscription, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { appRoutes } from '../library/utility/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  sbr: Subscription;
  constructor(
    private http: AppHttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sbr = new Subscription();
  }

  test() {
    return this.http.post('/welcome', {});
  }

  signin(email: string, password: string) {
    return this.http
      .post('/account/signin', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.authService.setUserAndToken(response);
        })
      );
  }

  logout() {
    this.authService.setUser(null);
    this.authService.setToken(null);
    this.router.navigate([appRoutes.home]);
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return this.http.post('/account/signup', {
      email,
      password,
      firstName,
      lastName,
    });
  }
  forgotPassword(email: string) {
    return this.http.post('/forgot-password', {
      email,
    });
  }
}
