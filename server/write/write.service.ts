import * as Bluebird from 'bluebird';
import WriteDao from './write.dao';
import { Post } from '../../common/interfaces/post';
import { Files } from '../../common/interfaces/files';

export default class WriteServie {
  constructor(
    private writeDao: WriteDao
  ) {}

  async postWrite(postInfo: Post, fileInfo: Files): Bluebird<any> {
    try {
      const {dataValues: {file_number}} = await this.writeDao.postFiles(fileInfo);
      Object.assign(postInfo, {img_number: file_number});
      return await this.writeDao.postWrite(postInfo);
    } catch (err) {
      throw err;
    }
  }
}
