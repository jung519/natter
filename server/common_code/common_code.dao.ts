import { SQ } from '../sequelize';
import { CommonCode } from '../../common/interfaces/common_code';
import { yes_no } from '../../common/common_enum';
import { CommonCodeModel } from '../models/common_code';
import * as Bluebird from 'bluebird';

export class CommonCodeDao extends SQ {
  constructor() {
    super();
  }

  async getCodeInfo(cd: string): Bluebird<CommonCode> {
    return await CommonCodeModel.findOne({
      where: {
        cd: cd
      }
    });
  }

  async getCodeList(up_cd: string): Bluebird<CommonCode[]> {
    return await CommonCodeModel.findAll({
      where: {
        up_cd: up_cd
      },
      order: [
        ['cd', 'DESC']
      ]
    });
  }

  async upsertCode(options: CommonCode): Bluebird<any> {
    return await CommonCodeModel.findOne({
      where: {
        cd: options.cd
      }
    })
    .then(result => {
      if (result) {
        // update
        CommonCodeModel.update({
          cd: options.edit_cd,
          cd_name: options.cd_name,
          use_yn: options.use_yn,
          update_date: new Date(),
          etc: options.etc
        }, {
          where: {
            cd: options.cd
          }
        });
      } else {
        // create
        CommonCodeModel.create({
          cd: options.edit_cd,
          cd_name: options.cd_name,
          up_cd: options.up_cd,
          use_yn: options.use_yn,
          create_date: new Date(),
          etc: options.etc
        });
      }
    });
  }

  async getUpCodeList() {
    return await CommonCodeModel.findAndCount({
      where: {
        up_cd: {
          [this.op.eq]: null
        }
      },
      order: [
        ['cd', 'DESC']
      ]
    });
  }

  async putUpcdDetail(options: CommonCode): Bluebird<any> {
    return await CommonCodeModel.update({
      cd_name: options.cd_name,
      use_yn: options.use_yn,
      update_date: new Date(),
      etc: options.etc
    }, {
      where: {
        cd: options.cd
      }
    });
  }
}
