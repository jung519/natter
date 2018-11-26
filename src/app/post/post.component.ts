import { Component, OnInit } from '@angular/core';
import { Post } from '../../../common/interfaces/post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  post_list = [];
  post_info: Post;
  paging: Post;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.initInterface();
    this.getPostList();

  }

  getPostList() {
    this.postService.getPostList(this.post_info)
    .subscribe(result => {
      for (let i of result) {
        this.post_list.push(i);
      }
    });
  }

  initInterface() {
    this.post_info = {
      page_number: 1,
      row_cnt: 10
    };
  }

  setPaging() {
    this.post_info.page_number += this.post_info.row_cnt;
    this.getPostList();
  }
}
