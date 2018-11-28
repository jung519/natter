import { Component, OnInit } from '@angular/core';
import { Post, PostLike } from '../../../common/interfaces/post';
import { Follow } from '../../../common/interfaces/follow';
import { PostService } from './post.service';
import { User } from '../../../common/interfaces/user';
import { AuthService } from '../core/auth.service';
import { yes_no, post_status } from '../../../common/common_enum';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  post_list = [];
  post_info: Post;
  paging: Post;
  user_info: User;
  post_like_info: PostLike;
  follow_info: Follow;
  default_img = 'http://localhost:23000/default_profile.png';

  constructor(
    private postService: PostService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.getSignInUserInfo();
    this.initInterface();
    this.getPostList();
  }

  getSignInUserInfo() {
    this.user_info = this.auth.getUserInfo();
  }

  getPostList() {
    this.postService.getPostList(this.post_info, this.user_info.user_number)
    .subscribe(result => {
      for (let i of result) {
        this.post_list.push(i);
      }
    });
  }

  initInterface() {
    this.post_info = {
      page_number: 1,
      row_cnt: 10,
      user_number: null,
    };
    this.post_like_info = {
      post_like_number: null,
      post_number: null,
      user_number: null,
      use_yn: yes_no.no
    };
    this.follow_info = {
      user_number: null,
      follow_user_number: null,
      use_yn: yes_no.no
    };
  }

  setPaging() {
    this.post_info.page_number += this.post_info.row_cnt;
    this.getPostList();
  }

  getInitPostList() {
    this.post_list = [];
    this.getPostList();
  }

  getMyPostList(user_number) {
    this.post_info.user_number = user_number;
    this.post_list = [];
    this.getPostList();
  }

  setLike(post_number: number) {
    this.post_list.filter(result => {
      if (result.post_number === post_number) {
        result.like_use_yn = result.like_use_yn === yes_no.yes ? yes_no.no : yes_no.yes;
        this.post_like_info.use_yn = result.like_use_yn;
      }
    });
    this.post_like_info.post_number = post_number;
    this.post_like_info.user_number = this.user_info.user_number;
    this.postService.setLike(this.post_like_info)
    .subscribe(result => {
      // this.getInitPostList();
    });
  }

  setFollow(user_number: number, post_number: number) {
    this.post_list.filter(result => {
      if (result.post_number === post_number) {
        result.follow_use_yn = result.follow_use_yn === yes_no.yes ? yes_no.no : yes_no.yes;
        this.follow_info.use_yn = result.follow_use_yn;
      }
    });
    this.follow_info.user_number = this.user_info.user_number;
    this.follow_info.follow_user_number = user_number;
    this.postService.setFollow(this.follow_info)
    .subscribe(result => {
      this.post_list.filter(obj => {
        if (obj.user_number === this.follow_info.follow_user_number) {
          obj.follow_use_yn = this.follow_info.use_yn;
        }
      });
    });
  }

  setHideAndReport(post_number: number, type: string) {
    const options = {
      post_number: post_number,
      post_status: type === 'H' ? post_status.hide
                  : type === 'R' ? post_status.report
                  : null
    };
    this.postService.putHideAndReport(options)
    .subscribe(result => {
      result[0] === 1 ? alert('변경되었습니다.') : alert('에러');
      this.getInitPostList();
    });
  }

  putRemovePost(post_number: number) {
    if (confirm('삭제함?')) {
      this.postService.putRemovePost(post_number)
      .subscribe(result => {
        result[0] === 1 ? alert('응 삭제') : alert('다시해 에러났어');
        this.getInitPostList();
      });
    }
  }
}
