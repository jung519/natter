import { Injectable } from '@angular/core';
import { Post } from '../../../common/interfaces/post';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WriteService {
  private readonly prefix;

  constructor(
    private http: HttpClient,
  ) {
    this.prefix = `${environment.natter_api_url}/write`;
  }

  postWrite(options: FormData): Observable<any> {
    return this.http.post(`${this.prefix}/write`, options)
    .pipe(tap(result => {
      return result;
    }));
  }
}
