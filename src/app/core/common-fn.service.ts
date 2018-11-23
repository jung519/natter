import { Injectable } from '@angular/core';

@Injectable()
export class CommonFnService {

  makeQueryString(param: {}): string {
    return Object.keys(param).reduce((str, i) => {
      if (param[i] && i) { str += `${i}=${param[i]}&`; }
      return str;
    }, '');
  }

}
