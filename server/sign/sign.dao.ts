import { SignAuth } from '../../common/interfaces/user';
import { User } from '../models/users';
import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { signUpDefaultInfo } from '../../common/common_enum';


export default class SignDao extends SQ {
  constructor() {
    super();
  }

  async getSignPermission(options: SignAuth): Bluebird<SignAuth> {
    const { sql, replacements } = this.getSignPermissionQuery(options);
    const [[permissionResult]] = await this.sequelizeQuery(sql, {replacements, type: this.queryType['SELECT'] });
    return <SignAuth>{...permissionResult};
  }

  getSignPermissionQuery(options: SignAuth): {sql, replacements} {
    const replacements = {};
    const sql = `
      SELECT u.user_number, u.email, u.user_name, u.introduce, user_class, u.user_status, u.sign_fail_cnt
      , (u.password = :password) as pw_conform, CONCAT('http://localhost:23000/', f.file_name) AS profile_img
      FROM users AS u
      LEFT JOIN natter.files AS f ON u.img_number = f.file_number
      WHERE u.email = :email
      AND u.user_status = '${signUpDefaultInfo.user_status}'
    `;
    replacements['email'] = options.email;
    replacements['password'] = options.password;
    return {sql, replacements};
  }

  updateSignInInfo(email: string): void {
    User.update({
      sign_fail_cnt : 0
    }, {
      where : {email: email}
    });
  }

  increaseInvalidPasswordCnt(email: string): void {
    User.update({
      sign_fail_cnt : this.literal('sign_fail_cnt + 1')
    }, {
      where: {email: email}
    });
  }

  async addSignUp(options: SignAuth): Bluebird<any> {
    return await User.findOrCreate({
      where: {
        email: options.email
      },
      defaults: {
        email: options.email,
        user_name: options.user_name,
        password: options.password,
        create_date: new Date(),
        introduce: options.introduce,
        user_class: signUpDefaultInfo.user_class,
        user_status: signUpDefaultInfo.user_status
      }
    })
    .spread((result, created) => {
      return {result, created};
    });
  }

  async checkSignEmail(options: SignAuth): Bluebird<any> {
    return await User.findOrCreate({
      where: {
        email: options.email
      },
      defaults: {
        email: options.email,
        password: options.password,
        user_name: options.user_name
      }
    })
    .spread((result, created) => {
      console.log('[dao] =', result, created);
      return {result, created};
    });
  }
}
