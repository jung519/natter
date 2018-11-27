import { Component, OnInit, ViewChild } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { yes_no } from '../../../common/common_enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  @ViewChild(PostComponent) postComp: PostComponent;


  constructor() { }

  ngOnInit() {
  }

  searchPost(event) {
    if (event) {
      this.postComp.getMyPostList(event);
    } else {
      this.postComp.getInitPostList();
    }
  }

}
