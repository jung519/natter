import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { Post } from '../models/posts';
import { PostLike } from '../models/post_like';
import { Follow } from '../models/follow';
import * as post from '../../common/interfaces/post';
import * as follow from '../../common/interfaces/follow';
import { yes_no, user_status, post_status } from '../../common/common_enum';

export default class PostDao extends SQ {
  constructor() {
    super();
  }

  async getPostList(options: post.Post, sign_in_options): Bluebird<post.Post[]> {
    const {sql} = this.getPostListQuery(options, sign_in_options);
    const [permissonResult] = await this.sequelizeQuery(sql, {type: this.queryType['SELECT']});
    return <post.Post[]>permissonResult;
  }

  getPostListQuery(options: post.Post, sign_in_options): {sql} {
    let sql = `
      SELECT p.post_number, p.post_status, p.user_number, u.user_name, u.email, p.content,
            IFNULL(p.update_date, p.create_date) AS create_date, CONCAT('http://localhost:23000/',img.file_name) AS img_url,
            pl.use_yn AS like_use_yn, f.use_yn AS follow_use_yn
      FROM natter.posts AS p
      INNER JOIN  natter.users AS u ON p.user_number = u.user_number
      LEFT JOIN natter.files AS img ON p.img_number = img.file_number
      LEFT JOIN (
                  SELECT post_like_number, post_number, use_yn
                  FROM natter.post_like
                  WHERE user_number = ${sign_in_options.user_number}
                ) AS pl ON p.post_number = pl.post_number
      LEFT JOIN natter.follow AS f on p.user_number = f.follow_user_number AND f.user_number = ${sign_in_options.user_number}
      WHERE p.del_yn = '${yes_no.no}'
      AND u.user_status = '${user_status.in_use}'
      AND p.post_status = '${post_status.write}'
      `;
    sql += options.user_number ? ` AND u.user_number = ${options.user_number}` : ``;
    sql += ` ORDER BY IFNULL(p.update_date, p.create_date) DESC
      LIMIT ${options.page_number}, ${options.row_cnt}
      `;

    return {sql};
  }

  async setLike(options: post.PostLike): Bluebird<any> {
    return PostLike.findOne({
      where: {
        post_number: options.post_number,
        user_number: options.user_number
      }
    })
    .then(result => {
      if (result) {
        // update
        PostLike.update({
          use_yn: options.use_yn
        }, {
          where: {
            post_number: options.post_number,
            user_number: options.user_number
          }
        });
      } else {
        // create
        PostLike.create({
          post_number: options.post_number,
          user_number: options.user_number,
          use_yn: options.use_yn
        });
      }
    });
  }

  async setFollow(options: follow.Follow): Bluebird<any> {
    Follow.findOne({
      where: {
        user_number: options.user_number,
        follow_user_number: options.follow_user_number
      }
    })
    .then(result => {
      if (result) {
        // update
        Follow.update({
          use_yn: options.use_yn
        }, {
          where: {
            user_number: options.user_number,
            follow_user_number: options.follow_user_number
          }
        });
      } else {
        // create
        Follow.create({
          user_number: options.user_number,
          follow_user_number: options.follow_user_number,
          use_yn: options.use_yn
        });
      }
    });
  }

  async putHideAndReport(options: any): Bluebird<any> {
    return Post.update({
      post_status: options.post_status
    }, {
      where: {post_number: options.post_number}
    });
  }

  async putRemovePost(post_number: number): Bluebird<any> {
    return Post.update({
      del_yn: yes_no.yes,
      update_date: new Date()
    }, {
      where: {post_number: post_number}
    });
  }
}
