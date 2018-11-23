import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import { CommonCode } from '../../common/interfaces/common_code';

export interface CM extends Sequelize.Model<CM, CommonCode> {
  cd?: string;
  up_cd?: string;
  cd_name?: string;
  use_yn?: string;
  create_date?: Date;
  update_date?: Date;
  etc?: string;
}


export const CommonCodeModel = sequelize.define<CM, CommonCode>('common_code', {
  cd: {type: Sequelize.STRING, primaryKey: true},
  up_cd: {type: Sequelize.STRING},
  cd_name: {type: Sequelize.STRING},
  use_yn: {type: Sequelize.STRING},
  create_date: {type: Sequelize.DATE},
  update_date: {type: Sequelize.DATE},
  etc: {type: Sequelize.STRING}
}, {
  classMethods: {},
  tableName: 'common_code',
  freezeTableName: true,
  underscored: true,
  timestamps: false
});
