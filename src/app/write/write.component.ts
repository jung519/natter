import { Component, OnInit } from '@angular/core';
import { WriteService } from './write.service';
import { Post } from '../../../common/interfaces/post';
import { AuthService } from '../core/auth.service';
import { User } from '../../../common/interfaces/user';
import { yes_no } from '../../../common/common_enum';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
})
export class WriteComponent implements OnInit {
  post_info: Post;
  user_info: User;

  constructor(
    private writeServie: WriteService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.initInterface();
  }

  getUserInfo() {
    this.user_info = this.auth.getUserInfo();
  }

  initInterface() {
    this.post_info = {
      user_number: this.user_info.user_number,
      content: ''
    };
  }

  postWrite() {
    this.writeServie.postWrite(this.post_info)
    .subscribe(result => {
      result[0] === 1 ? alert('등록되었습니다.') : alert('오류가 발생하여 등록에 실패 했습니다.');
    });
  }
}
