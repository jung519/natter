import * as Bluebird from 'bluebird';
import PostDao from './post.dao';
import { Post, PostLike } from '../../common/interfaces/post';
import { Follow } from '../../common/interfaces/follow';

export default class PostService {
  constructor(
    private postDao: PostDao
  ) {}

  async getPostList(options: Post, sign_in_options): Bluebird<Post[]> {
    try {
      return await this.postDao.getPostList(options, sign_in_options);
    } catch (err) {
      throw err;
    }
  }

  async setLike(options: PostLike): Bluebird<any> {
    try {
      return await this.postDao.setLike(options);
    } catch (err) {
      throw err;
    }
  }

  async setFollow(options: Follow): Bluebird<any> {
    try {
      return await this.postDao.setFollow(options);
    } catch (err) {
      throw err;
    }
  }

  async putHideAndReport(options: any): Bluebird<any> {
    try {
      return this.postDao.putHideAndReport(options);
    } catch (err) {
      throw err;
    }
  }

  async putRemovePost(post_number: number): Bluebird<any> {
    try {
      return this.postDao.putRemovePost(post_number);
    } catch (err) {
      throw err;
    }
  }
}
