import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignAuth } from '../../../common/interfaces/user';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html'
})
export class SignComponent implements OnInit {

  private readonly redirect: string;
  sign: SignAuth;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.redirect = this.route.snapshot.queryParams['redirect'] || '/';
  }

  ngOnInit() {
    this.initInterfaceObject();
    // if (!this.auth.isTokenExpired()) this.router.navigate(['/']);
  }

  initInterfaceObject() {
    this.sign = {
      email: '',
      user_name: '',
      password: '',
      signup_email: '',
      signup_pw: '',
      signup_pw_1: '',
      introduce: ''
    };
  }

  signIn(): void {
    this.auth.signIn(this.sign)
    .subscribe(() => {
      this.router.navigateByUrl(this.redirect);
    });
  }

  signWithGoogle() {
    alert('go! google');
  }

  signUp(): void {
    if (this.sign.signup_pw === this.sign.signup_pw_1) {
      this.sign.email = this.sign.signup_email;
      this.sign.password = this.sign.signup_pw;
      this.auth.signUp(this.sign)
      .subscribe(result => {
        if (result) {
          alert('회원가입이 완료 되었습니다.\n로그인 화면으로 이동합니다.');
          location.reload();
        } else {
          alert('이미 가입된 이메일 입니다.');
          this.sign.email = '';
          this.sign.signup_email = '';
        }
      });
    } else {
      this.sign.signup_pw_1 = '';
    }
  }

}
