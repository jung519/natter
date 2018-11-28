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
      img_number: options.file_number,
      update_date: new Date()
    }, {
      where: {
        user_number: options.user_number
      }
    });
  }

  async getUserInfo(user_number: number): Bluebird<user.User> {
    const {sql} = this.getUserInfoQuery(user_number);
    const [[queryResult]] = await this.sequelizeQuery(sql, {type: this.queryType['SELECT']});
    return <user.User>{...queryResult};

  }

  private getUserInfoQuery(user_number: number): {sql} {
    const sql = `
      SELECT u.user_number, u.email, u.user_name, u.introduce, user_class, u.user_status, u.sign_fail_cnt
      , CONCAT('http://localhost:23000/', f.file_name) AS profile_img
      FROM natter.users AS u
      LEFT JOIN natter.files AS f ON u.img_number = f.file_number
      WHERE u.user_number = ${user_number}
    `;
    return {sql};
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
