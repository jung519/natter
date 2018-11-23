import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonCode } from '../../../common/interfaces/common_code';
import { common_code } from '../../../common/common_enum';
import { tap } from 'rxjs/operators';
import { CommonFnService } from '../core/common-fn.service';
import { Observable } from 'rxjs';

@Injectable()
export class CodeService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonFn: CommonFnService
  ) { }

  // 코드 조회
  getCodeInfo(code: string): Observable<CommonCode> {
    const qs = this.commonFn.makeQueryString({code: code});
    return this.http.get(`${environment.natter_api_url}/common_code/info?${qs}`)
    .pipe(tap(result => {
      return result;
    }));
  }

  // 하위 코드 목록 조회
  getCodeList(up_cd: string): Observable<CommonCode[]> {
    const options = this.commonFn.makeQueryString({up_cd: up_cd});
    return this.http.get<CommonCode[]>(`${environment.natter_api_url}/common_code/list?${options}`)
    .pipe(tap(result => {
      return result;
    }));
  }

}
