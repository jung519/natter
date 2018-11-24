import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { Post } from '../models/posts';
import * as post from '../../common/interfaces/post';
import { yes_no, post_status } from '../../common/common_enum';

export default class WriteDao extends SQ {
  constructor() {
    super();
  }

  async postWrite(options: post.Post): Bluebird<any> {
    return Post.create({
      content: options.content,
      user_number: options.user_number,
      create_date: new Date(),
      post_status: post_status.write,
      del_yn: yes_no.no,
    });
  }
}
