import * as Bluebird from 'bluebird';
import WriteDao from './write.dao';
import { Post } from '../../common/interfaces/post';
import { Files } from '../../common/interfaces/files';
import Dao from '../../common/common_dao';
import { Hashtag } from '../../common/interfaces/hashtag';

export default class WriteServie {
  private dao = new Dao;
  constructor(
    private writeDao: WriteDao
  ) {}

  async postWrite(postInfo: Post, fileInfo: Files): Bluebird<any> {
    try {
      if (fileInfo && fileInfo !== undefined) {
        const {dataValues: {file_number}} = await this.dao.file_upload(fileInfo);
        Object.assign(postInfo, {img_number: file_number});
      }
      const {dataValues: {post_number}} = await this.writeDao.postWrite(postInfo);
      if (postInfo.hashtag_set) {
        const paramTypeOf = typeof postInfo.hashtag_set;
        if (paramTypeOf === 'string') {
          const options: Hashtag = {
            hash_tag: postInfo.hashtag_set,
            post_number: post_number
          };
          await this.writeDao.hashtag(options);
        } else {
          await postInfo.hashtag_set.forEach(e => {
            const options: Hashtag = {
              hash_tag: e,
              post_number: post_number
            };
            this.writeDao.hashtag(options);
          });
        }
      }
      return post_number;
    } catch (err) {
      throw err;
    }
  }
}
