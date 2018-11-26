import { Router } from 'express';
import PostService from './post.service';
import PostDao from './post.dao';
import { Post } from '../../common/interfaces/post';

export const PostController = Router();
const postService = new PostService(new PostDao);

PostController.get('/list', (req, res) => {
  const options: Post = {
    page_number: Number(req.param('page_number')),
    row_cnt: Number(req.param('row_cnt'))
  };
  postService.getPostList(options)
  .then(result => {
    return res.json(result);
  });
});
