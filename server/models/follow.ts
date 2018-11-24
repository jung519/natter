import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';

export const Follow = sequelize.define('follow', {
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
