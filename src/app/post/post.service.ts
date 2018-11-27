import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post, PostLike } from '../../../common/interfaces/post';
import { Follow } from '../../../common/interfaces/follow';
import { CommonFnService } from '../core/common-fn.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly prefix;

  constructor(
    private http: HttpClient,
    private commonFn: CommonFnService
  ) {
    this.prefix = `${environment.natter_api_url}/post`;
  }

  getPostList(options: Post, sign_in_user_number: number): Observable<Post[]> {
    Object.assign(options, {sign_in_user_number: sign_in_user_number});
    return this.http.get<Post[]>(`${this.prefix}/list?${this.commonFn.makeQueryString(options)}`)
    .pipe(tap(result => {
      return result;
    }));
  }

  setLike(options: PostLike): Observable<any> {
    return this.http.post(`${this.prefix}/post_like`, options)
    .pipe(tap(result => {
      return result;
    }));
  }

  setFollow(options: Follow): Observable<any> {
    return this.http.post(`${this.prefix}/follow`, options)
    .pipe(tap(result => {
      return result;
    }));
  }

  putHideAndReport(options: any): Observable<any> {
    return this.http.put(`${this.prefix}/hide_report`, options)
    .pipe(tap(result => {
      return result;
    }));
  }

  putRemovePost(post_number: number): Observable<any> {
    return this.http.put(`${this.prefix}/remove_post`, {post_number: post_number})
    .pipe(tap(result => {
      return result;
    }));
  }

}
