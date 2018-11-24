import { Router } from 'express';
import { Post } from '../../common/interfaces/post';
import WriteService from './write.service';
import WriteDao from './write.dao';

export const WriteController = Router();
const writeService = new WriteService(new WriteDao);

WriteController.post(`/write`, (req, res) => {
  const options: Post = {
    user_number: Number(req.param('user_number')),
    content: req.param('content')
  };
  writeService.postWrite(options)
  .then(result => {
    return res.json(result);
  });
});
