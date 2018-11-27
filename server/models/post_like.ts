
import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as post from '../../common/interfaces/post';

interface PostLikeModel extends Sequelize.Model<PostLikeModel , post.PostLike> {
  post_like_number: number;
  post_number: number;
  user_number: number;
  use_yn: string;
}

export const PostLike = sequelize.define<PostLikeModel, post.PostLike>('post_like', {
  post_like_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  post_number: {type: Sequelize.INTEGER},
  user_number: {type: Sequelize.INTEGER},
  use_yn: {type: Sequelize.STRING}
}, {
  classMethods: {},
  tableName: 'post_like',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
