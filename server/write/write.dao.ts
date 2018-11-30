import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { Post } from '../models/posts';
import * as post from '../../common/interfaces/post';
import { yes_no, post_status } from '../../common/common_enum';
import * as files from '../../common/interfaces/files';
import { Files } from '../models/files';
import { Hashtag } from '../models/hashtag';
import * as hashtag from '../../common/interfaces/hashtag';

export default class WriteDao extends SQ {
  constructor() {
    super();
  }

  async postWrite(options: post.Post): Bluebird<any> {
    return await Post.create({
      content: options.content,
      user_number: options.user_number,
      create_date: new Date(),
      post_status: post_status.write,
      del_yn: yes_no.no,
      img_number: options.img_number
    });
  }

  async postFiles(options: files.Files): Bluebird<any> {
    return await Files.create({
      file_name: options.file_name,
      file_url: options.file_url,
      file_size: options.file_size,
      file_type: options.file_type,
      create_date: new Date(),
      original_name: options.original_name
    });
  }

  async hashtag(options: hashtag.Hashtag): Bluebird<any> {
    return await Hashtag.create({
      hash_tag: options.hash_tag,
      post_number: options.post_number
    });
  }
}
