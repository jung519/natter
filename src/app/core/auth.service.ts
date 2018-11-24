import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SignAuth } from '../../../common/interfaces/user';
import { Result } from 'range-parser';

@Injectable()
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router
    ) { }

  isTokenExpired() {
    const token = localStorage.getItem('access_token');
    if (token && token !== 'undefined') {
      if (!this.jwtHelper.getTokenExpirationDate(token)) {
        return true;
      }
      return this.jwtHelper.isTokenExpired(token);
    } else {
      return true;
    }
  }

  signIn(options: { email: string; password: string }) {
    return this.http.post(`${environment.natter_api_url}/auth/token`, options)
      .pipe(tap((r) => {
        localStorage.setItem('access_token', (r as any).token);
      }));
  }

  signUp(options: SignAuth) {
    return this.http.post<{}>(`${environment.natter_api_url}/signup`, options)
    .pipe(tap(result => {
      return result;
    }));
  }

  getUserInfo() {
    const token = localStorage.getItem('access_token');
    return token ? this.jwtHelper.decodeToken(token) : {};
  }
}
