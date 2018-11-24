import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { User } from '../models/users';
import { Follow } from '../models/follow';
import * as user from '../../common/interfaces/user';

export default class UserInfoDao extends SQ {
  constructor() {
    super();
  }

  async putUserInfo(options: user.User): Bluebird<any> {
    return await User.update({
      user_name: options.user_name,
      introduce: options.introduce,
      update_date: new Date()
    }, {
      where: {
        email: options.email
      }
    });
  }

  async getUserInfo(email: string): Bluebird<any> {
    return await User.findOne({
      where: {
        email: email
      }
    });
  }

  async getFollowerCnt(user_number: number): Bluebird<number> {
    return await Follow.count({
      where: {
        user_number: user_number
      }
    });
  }

  async getFollowingCnt(user_number: number): Bluebird<number> {
    return await Follow.count({
      where: {
        follow_user_number: user_number
      }
    });
  }

}
