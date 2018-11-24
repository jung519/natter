import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as user from '../../common/interfaces/user';

export interface UserModel extends Sequelize.Model<UserModel, user.User> {
  user_number: number;
  email: string;
  password: string;
  create_date: Date;
  update_date: Date;
  user_status: string;
  user_class: string;
  introduce: string;
}

export const User = sequelize.define<UserModel, user.User>('user', {
  user_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  email: {type: Sequelize.STRING},
  user_name: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  create_date: {type: Sequelize.DATE},
  update_date: {type: Sequelize.DATE},
  user_status: {type: Sequelize.STRING},
  user_class: {type: Sequelize.STRING},
  sign_fail_cnt: {type: Sequelize.INTEGER},
  introduce: {type: Sequelize.SMALLINT}
}, {
  classMethods: {},
  tableName: 'users',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
