import { SignAuth } from '../../common/interfaces/user';
import SignDao from './sign.dao';
import * as Bluebird from 'bluebird';
import * as crypto from 'crypto';

export class SignService {
  constructor(
    private signDao: SignDao
  ) {
  }

  async getSignPermission(options: SignAuth): Bluebird<SignAuth> {
    try {
      const hash_password = crypto.createHash('sha512').update(options.password).digest('base64');
      options.password = hash_password;
      const queryResult = await this.signDao.getSignPermission(options);

    if (!queryResult) { throw 1111; }   // id/password 가 틀림
    if (queryResult.sign_fail_cnt >= 5) { throw 1112; } // password를 5회 이상 틀린 경우

    if (queryResult.pw_conform === 0) {     // password가 틀린 경우
      await this.signDao.increaseInvalidPasswordCnt(options.email);
      throw 1111;
    }

    // 로그인 성공시 로그인 실패 카운트 초기화
    this.signDao.updateSignInInfo(options.email);
    return queryResult;
    } catch (err) {
      throw err;
    }
  }

  async addSignUp(options: SignAuth): Bluebird<any> {
    try {
      const hash_password = crypto.createHash('sha512').update(options.password).digest('base64');
      options.password = hash_password;
      const {result, created} = await this.signDao.addSignUp(options);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async processSimpleSign(options: SignAuth): Bluebird<any> {
    try {
      // 가입된 이메일인지 확인, 가입 안되어 있으면 회원가입
      const {result, created} = await this.signDao.addSignUp(options);
      return {result, created};
    } catch (err) {
      throw err;
    }
  }

}
