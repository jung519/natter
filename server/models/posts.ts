import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';

export const Post = sequelize.define('posts', {
  post_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  user_number: {type: Sequelize.INTEGER},
  content: {type: Sequelize.STRING},
  post_status: {type: Sequelize.STRING},
  create_date: {type: Sequelize.DATE},
  update_date: {type: Sequelize.DATE},
  del_yn: {type: Sequelize.STRING}
}, {
  classMethods: {},
  tableName: 'posts',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
