import * as Bluebird from 'bluebird';
import WriteDao from './write.dao';
import { Post } from '../../common/interfaces/post';
import { Files } from '../../common/interfaces/files';
import Dao from '../../common/common_dao';

export default class WriteServie {
  private dao = new Dao;
  constructor(
    private writeDao: WriteDao
  ) {}

  async postWrite(postInfo: Post, fileInfo: Files): Bluebird<any> {
    try {
      if (fileInfo) {
        const {dataValues: {file_number}} = await this.dao.file_upload(fileInfo);
        Object.assign(postInfo, {img_number: file_number});
      }
      return await this.writeDao.postWrite(postInfo);
    } catch (err) {
      throw err;
    }
  }
}
