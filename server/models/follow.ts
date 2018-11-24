import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as follow from '../../common/interfaces/follow';

interface FollowModel extends Sequelize.Model<FollowModel , follow.Follow> {
  follow_number: number;
  user_number: number;
  follow_user_number: number;
}

export const Follow = sequelize.define<FollowModel, follow.Follow>('follow', {
  follow_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  user_number: {type: Sequelize.INTEGER},
  follow_user_number: {type: Sequelize.INTEGER}
}, {
  classMethods: {},
  tableName: 'follow',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
