import { Router } from 'express';
import PostService from './post.service';
import PostDao from './post.dao';
import { Post, PostLike } from '../../common/interfaces/post';
import { Follow } from '../../common/interfaces/follow';

export const PostController = Router();
const postService = new PostService(new PostDao);

PostController.get('/list', (req, res) => {
  const options: Post = {
    page_number: Number(req.param('page_number')) - 1,
    row_cnt: Number(req.param('row_cnt')),
    user_number: Number(req.param('user_number'))
  };
  const sign_in_options = {
    user_number: Number(req.param('sign_in_user_number'))
  };
  console.log(sign_in_options);
  postService.getPostList(options, sign_in_options)
  .then(result => {
    return res.json(result);
  });
});

PostController.post('/post_like', (req, res) => {
  const options: PostLike = {
    post_number: Number(req.param('post_number')),
    user_number: Number(req.param('user_number')),
    use_yn: req.param('use_yn')
  };
  postService.setLike(options)
  .then(result => {
    return res.json(result);
  });
});

PostController.post('/follow', (req, res) => {
  const options: Follow = {
    user_number: Number(req.param('user_number')),
    follow_user_number: Number(req.param('follow_user_number')),
    use_yn: req.param('use_yn')
  };
  console.log(options);
  postService.setFollow(options)
  .then(result => {
    return res.json(result);
  });
});

PostController.put('/hide_report', (req, res) => {
  const options = {
    post_number: Number(req.param('post_number')),
    post_status: req.param('post_status')
  };
  postService.putHideAndReport(options)
  .then(result => {
    return res.json(result);
  });
});

PostController.put('/remove_post', (req, res) => {
  const post_number: number = Number(req.param('post_number'));
  postService.putRemovePost(post_number)
  .then(result => {
    return res.json(result);
  });
});
