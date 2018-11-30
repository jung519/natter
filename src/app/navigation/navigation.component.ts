import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  tag: string;
  @Output() tagEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  setTag(tag) {
    this.tag = tag;
  }

  searchTag() {
    this.tagEvent.emit(this.tag);
  }

}
