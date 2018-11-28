import * as Bluebird from 'bluebird';
import UserInfoDao from './user_info.dao';
import { User } from '../models/users';
import * as user from '../../common/interfaces/user';
import * as files from '../../common/interfaces/files';
import { tokenSign } from '../sign/sign.controller';
import Dao from '../../common/common_dao';

export default class UserInfoService {
  private dao = new Dao;
  constructor(
    private userInfoDao: UserInfoDao,
  ) {}

  async putUserInfo(options: user.User, profile_file: files.Files): Bluebird<any> {
    try {
      if (profile_file) {
        const {dataValues: {file_number}} = await this.dao.file_upload(profile_file);
        Object.assign(options, {file_number: file_number});
      }
      const updateResult = await this.userInfoDao.putUserInfo(options);
      if (updateResult[0] === 1) {
        const user_info: user.User = await this.userInfoDao.getUserInfo(options.user_number);
        const token =  tokenSign(user_info);
        return {token};
      }
      return updateResult;
    } catch (err) {
      throw err;
    }
  }

  async getFollowInfo(user_number: number): Bluebird<any> {
    try {
      const follower = this.userInfoDao.getFollowerCnt(user_number);
      const following = this.userInfoDao.getFollowingCnt(user_number);
      const aa = await Promise.all([follower, following]);
      return aa;
    } catch (err) {
      throw err;
    }
  }

}
