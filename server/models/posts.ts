import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as post from '../../common/interfaces/post';

interface PM extends Sequelize.Model<PM, post.Post> {
  post_number: number;
  user_number: number;
  content: string;
  post_status: string;
  create_date: Date;
  update_date?: Date;
  del_yn: string;
}

export const Post = sequelize.define<PM, post.Post>('posts', {
  post_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  user_number: {type: Sequelize.INTEGER},
  content: {type: Sequelize.STRING},
  post_status: {type: Sequelize.STRING},
  create_date: {type: Sequelize.DATE},
  update_date: {type: Sequelize.DATE},
  del_yn: {type: Sequelize.STRING},
  img_number: {type: Sequelize.INTEGER}
}, {
  classMethods: {},
  tableName: 'posts',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
