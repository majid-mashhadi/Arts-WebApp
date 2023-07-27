import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AppHttpService } from '../library/components/services/http.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: string = 'token';
  user: any;

  userItemKey = 'user';
  tokenItemKey = 'token';

  constructor(private httpService: AppHttpService) {
    const userObj = localStorage.getItem(this.userItemKey);
    if (userObj) {
      this.user = JSON.parse(userObj);
    }
    const tokenObj = localStorage.getItem(this.tokenItemKey);
    if (tokenObj) {
      this.authToken = JSON.parse(tokenObj);
    }
  }

  refreshToken() {
    return this.httpService
      .post('/Account/RefreshToken', {
        refreshToken: this.getAccessToken(),
      })
      .pipe(
        tap((response: any) => {
          this.setUserAndToken(response);
        })
      );
  }

  isLoggedIn() {
    return !!this.user && !!this.authToken;
  }

  setUserAndToken(response: any) {
    const { token } = response;
    const jwtToken: any = jwt_decode(token);
    const { unique_name, given_name, email, id } = jwtToken;
    const user = {
      email,
      firstName: unique_name,
      lastName: given_name,
      id,
    };
    this.setUser(user);
    this.setToken(token);
    return user;
  }

  setToken(token: any) {
    if (token) {
      this.authToken = token;
      localStorage.setItem(this.tokenItemKey, JSON.stringify(token));
    } else {
      localStorage.removeItem(this.tokenItemKey);
    }
  }

  getAccessToken() {
    return this.isLoggedIn() ? this.authToken : null;
  }

  setUser(user: any, updateLocalStorage: boolean = true) {
    this.user = user;
    if (updateLocalStorage) {
      if (user) {
        localStorage.setItem(this.userItemKey, JSON.stringify(this.user));
      } else {
        localStorage.removeItem(this.userItemKey);
      }
    }
  }

  getUser() {
    return this.isLoggedIn() ? this.user : null;
  }
}
