import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../../common/interfaces/user';
import { CommonFnService } from '../core/common-fn.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private readonly prefix;

  constructor(
    private http: HttpClient,
    private commonFn: CommonFnService
  ) {
    this.prefix = `${environment.natter_api_url}/user_info`;
  }

  putUserInfo(formData: FormData): Observable<any> {
    return this.http.put(`${this.prefix}/info`, formData)
    .pipe(tap(result => {
      return result;
    }));
  }

  getUserFollowInfo(user_number: number): Observable<any> {
    const options = this.commonFn.makeQueryString({user_number: user_number});
    return this.http.get(`${this.prefix}/follow_info?${options}`)
    .pipe(tap(result => {
      return result;
    }));
  }

}
