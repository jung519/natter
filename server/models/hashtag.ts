import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as hashtag from '../../common/interfaces/hashtag';

interface HashtagModel extends Sequelize.Model<HashtagModel , hashtag.Hashtag> {
  tag_number?: number;
  hash_tag?: string;
  post_number?: number;
}

export const Hashtag = sequelize.define<HashtagModel, hashtag.Hashtag>('hashtag', {
  tag_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  hash_tag: {type: Sequelize.STRING},
  post_number: {type: Sequelize.INTEGER}
}, {
  classMethods: {},
  tableName: 'hashtag',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
