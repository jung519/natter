import * as Bluebird from 'bluebird';
import { SQ } from '../sequelize';
import { Post } from '../models/posts';
import * as post from '../../common/interfaces/post';
import { yes_no, user_status } from '../../common/common_enum';

export default class PostDao extends SQ {
  constructor() {
    super();
  }

  async getPostList(options: post.Post): Bluebird<post.Post[]> {
    const {sql, replacement} = this.getPostListQuery(options);
    const [permissonResult] = await this.sequelizeQuery(sql, {replacement, type: this.queryType['SELECT']});
    return <post.Post[]>permissonResult;
  }

  getPostListQuery(options: post.Post): {sql, replacement} {
    console.log(options);
    const replacement = {};
    const sql = `
      SELECT p.post_number, p.post_status, p.user_number, u.user_name, u.email, p.content,
            IFNULL(p.update_date, p.create_date) AS create_date, img.file_url AS img_url
      FROM natter.posts AS p
      INNER JOIN  natter.users AS u ON p.user_number = u.user_number
      LEFT JOIN natter.files AS img ON p.img_number = img.file_number
      WHERE p.del_yn = '${yes_no.no}'
      AND u.user_status = '${user_status.in_use}'
      ORDER BY IFNULL(p.update_date, p.create_date) DESC
      LIMIT ${options.page_number}, ${options.row_cnt}
      `;

    return {sql, replacement};
  }

}
