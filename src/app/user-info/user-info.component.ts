import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { AuthService } from '../core/auth.service';
import { User } from '../../../common/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit {
  userInfo: User;
  show_hide = true;
  follow_info: any;

  constructor(
    private userInfoService: UserInfoService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initParam();
    this.getSignUserInfo();
    this.getUserFollowInfo();
  }

  initParam() {
    this.follow_info = {
      follower_cnt: 0,
      following_cnt: 0
    };
  }

  getSignUserInfo() {
    this.userInfo = this.auth.getUserInfo();
  }

  // 팔로우 정보
  getUserFollowInfo() {
    this.userInfoService.getUserFollowInfo(this.userInfo.user_number)
    .subscribe(result => {
      this.follow_info.follower_cnt = result[0];
      this.follow_info.following_cnt = result[1];
    });
  }

  signOut() {
    if (confirm('로그아웃 하냐?')) {
      localStorage.removeItem('access_token');
      location.reload();
    }
  }

  putUserInfo() {
    this.userInfoService.putUserInfo(this.userInfo)
    .subscribe(result => {
      if (result[0] === 0) {
        alert('수정 중 오류 발생\n관리자에게 문의');
      } else {
        localStorage.setItem('access_token', (result as any).token);
        this.getSignUserInfo();
        this.show_hide = true;
      }
    });
  }

  setInfo() {
    this.show_hide ? this.show_hide = false : this.show_hide = true;
  }

}
