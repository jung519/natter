import * as Bluebird from 'bluebird';
import WriteDao from './write.dao';
import { Post } from '../../common/interfaces/post';

export default class WriteServie {
  constructor(
    private writeDao: WriteDao
  ) {}

  async postWrite(options: Post): Bluebird<any> {
    try {
      return await this.writeDao.postWrite(options);
    } catch (err) {
      throw err;
    }
  }
}
