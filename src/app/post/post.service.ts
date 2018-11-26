import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../../../common/interfaces/post';
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

  getPostList(options: Post): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.prefix}/list?${this.commonFn.makeQueryString(options)}`)
    .pipe(tap(result => {
      return result;
    }));
  }
}
