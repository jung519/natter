import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// custum module
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// env
import { environment } from '../environments/environment';

// component
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SignComponent } from './sign/sign.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { WriteComponent } from './write/write.component';
import { PostComponent } from './post/post.component';


// service
import { UserInfoService } from './user-info/user-info.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignComponent,
    NavigationComponent,
    UserInfoComponent,
    WriteComponent,
    PostComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: environment.whitelisted_domains
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    UserInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
