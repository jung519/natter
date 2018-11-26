import * as Bluebird from 'bluebird';
import PostDao from './post.dao';
import { Post } from '../../common/interfaces/post';

export default class PostService {
  constructor(
    private postDao: PostDao
  ) {}

  async getPostList(options: Post): Bluebird<Post[]> {
    try {
      return await this.postDao.getPostList(options);
    } catch (err) {
      throw err;
    }
  }
}
