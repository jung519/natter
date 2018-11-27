import { Router } from 'express';
import { Post } from '../../common/interfaces/post';
import { Files } from '../../common/interfaces/files';
import WriteService from './write.service';
import WriteDao from './write.dao';
import { CommonFn } from '../../common/common_fn';

export const WriteController = Router();
const writeService = new WriteService(new WriteDao);
const commonFn = new CommonFn();

WriteController.post(`/write`, commonFn.multer().single('avatar') , (req, res) => {
  const postInfo: Post = {
    user_number: Number(req.param('user_number')),
    content: req.param('content')
  };
  let fileInfo: Files = {};
  if (req.file) {
    fileInfo = {
      file_name: req.file.filename,
      file_url: req.file.path,
      file_size: req.file.size,
      file_type: req.file.mimetype,
      original_name: req.file.originalname
    };
  }
  writeService.postWrite(postInfo, fileInfo)
  .then(result => {
    return res.json(result);
  });
});
