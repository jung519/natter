import * as Bluebird from 'bluebird';
import UserInfoDao from './user_info.dao';
import { User } from '../models/users';
import * as user from '../../common/interfaces/user';
import { tokenSign } from '../sign/sign.controller';

export default class UserInfoService {
  constructor(
    private userInfoDao: UserInfoDao
  ) {}

  async putUserInfo(options: user.User): Bluebird<any> {
    try {
      const updateResult = await this.userInfoDao.putUserInfo(options);
      if (updateResult[0] === 1) {
        const {dataValues: {user_number, email, user_name, introduce, user_class, user_status, sign_fail_cnt}}
          = await this.userInfoDao.getUserInfo(options.email);
        const returnOptions = {
          user_number: user_number,
          email: email,
          user_name: user_name,
          introduce: introduce,
          user_class: user_class,
          user_status: user_status,
          sign_fail_cnt: sign_fail_cnt
        };
        const token =  tokenSign(returnOptions);
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
