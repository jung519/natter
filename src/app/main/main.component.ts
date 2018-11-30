import { Component, OnInit, ViewChild } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { yes_no } from '../../../common/common_enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  @ViewChild(PostComponent) postComp: PostComponent;
  @ViewChild(NavigationComponent) navComp: NavigationComponent;


  constructor() { }

  ngOnInit() {
  }

  searchPost(event) {
    this.navComp.setTag('');
    this.postComp.post_info.hashtag = null;
    if (event) {
      this.postComp.getMyPostList(event);
    } else {
      this.postComp.getInitPostList();
    }
  }

  searchTag(tag) {
    console.log('searchTag = ', tag);
    this.postComp.getSearchTag(tag);
  }

  setTag(tag) {
    console.log('setTag =', tag);
    this.navComp.setTag(tag);
  }

}
