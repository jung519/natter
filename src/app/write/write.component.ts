import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { WriteService } from './write.service';
import { Post } from '../../../common/interfaces/post';
import { AuthService } from '../core/auth.service';
import { User } from '../../../common/interfaces/user';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
})
export class WriteComponent implements OnInit {
  post_info: Post;
  user_info: User;
  post_form: FormGroup;
  imageSrc: any;
  file: any;
  file_name: string;
  @Output() searchPost = new EventEmitter<string>();

  constructor(
    private writeServie: WriteService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.post_form = this.fb.group({
      avatar: ['', Validators.required]
    });
  }

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
      content: '',
      hashtag_set: []
    };
    this.file = null;
    this.imageSrc = null;
    this.file_name = '';
  }

  postWrite() {
    this.setHashtag();
    const formData = new FormData();
    formData.set('avatar', this.file);
    formData.set('content', this.post_info.content);
    formData.set('user_number', String(this.user_info.user_number));
    this.post_info.hashtag_set.forEach(e => {
      formData.append('hashtag', e);
    });

    this.writeServie.postWrite(formData)
      .subscribe(result => {
        if (result) {
          alert('등록되었습니다.');
          this.searchPost.emit('search');
          this.initInterface();
        } else {
          alert('오류가 발생하여 등록에 실패 했습니다.');
          this.initInterface();
        }
      });
  }


  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      // For Preview
      this.file = files[0];
      const reader = new FileReader();

      /* 브라우저는 보안 문제로 인해 파일 경로의 참조를 허용하지 않는다.
        따라서 파일 경로를 img 태그에 바인딩할 수 없다.
        FileReader.readAsDataURL 메소드를 사용하여 이미지 파일을 읽어
        base64 인코딩된 스트링 데이터를 취득한 후, img 태그에 바인딩한다. */
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      /* reactive form에서 input[type="file"]을 지원하지 않는다.
        즉 파일 선택 시에 값이 폼컨트롤에 set되지 않는다
        https://github.com/angular/angular.io/issues/3466
        form validation을 위해 file.name을 폼컨트롤에 set한다. */
      this.avatar.setValue(this.file.name);
    }
  }

  get avatar() {
    return this.post_form.get('avatar');
  }

  setHashtag() {
    let contentSet = '';
    const contentObj = this.post_info.content.replace(/(\r\n|\r|\n|\n\r)/g, ' ').split(' ');
    contentObj.forEach(result => {
      let a = result.indexOf('#');
      if (a === -1) {
        contentSet += result + ' ';
      } else {
        this.post_info.hashtag_set.push(result.replace('#', ''));
      }
    });
    this.post_info.content = contentSet;
  }
}
