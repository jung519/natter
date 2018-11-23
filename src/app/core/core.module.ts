import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CodeService } from './common-code.service';
import { CommonFnService } from './common-fn.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CollapseModule.forRoot()
  ],
  providers: [
    AuthService,
    CodeService,
    CommonFnService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
