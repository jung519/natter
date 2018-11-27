import { CommonCodeDao } from './common_code.dao';
import { CommonCode } from '../../common/interfaces/common_code';
import * as Bluebird from 'bluebird';

export class CommonCodeService {
  constructor(
    private commonCodeDao: CommonCodeDao
  ) { }

  async getCodeInfo(cd: string): Bluebird<CommonCode> {
    try {
      return await this.commonCodeDao.getCodeInfo(cd);
    } catch (err) {
      throw err;
    }
  }

  async getCodeList(up_cd: string): Bluebird<CommonCode[]> {
    try {
      return await this.commonCodeDao.getCodeList(up_cd);
    } catch (err) {
      throw err;
    }
  }

  async upsertCode(options: CommonCode): Bluebird<any> {
    try {
      return await this.commonCodeDao.upsertCode(options);
    } catch (err) {
      throw err;
    }
  }

  async getUpCodeList() {
    try {
      return this.commonCodeDao.getUpCodeList();
    } catch (err) {
      throw err;
    }
  }

  async putUpcdDetail(options: CommonCode): Bluebird<any> {
    try {
      return await this.commonCodeDao.putUpcdDetail(options);
    } catch (err) {
      throw err;
    }
  }
}
