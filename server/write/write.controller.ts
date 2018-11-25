import { Router } from 'express';
import { Post } from '../../common/interfaces/post';
import { Files } from '../../common/interfaces/files';
import WriteService from './write.service';
import WriteDao from './write.dao';
import * as multer from 'multer';
import * as crypto from 'crypto';

export const WriteController = Router();
const writeService = new WriteService(new WriteDao);

const replaceFileName = (originalname: string, type: string) => {
  const typeObj = type.split('/');
  const hashName = crypto.createHash('sha256').update(originalname).digest('hex');
  return `${hashName}.${typeObj[1]}`;
};

/* Setup File upload */
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'dist/out-tsc/files'); // 저장폴더
    },
    filename(req, file, cb) {
      cb(null, replaceFileName(file.originalname, file.mimetype)
        ); // 전송된 파일 자신의 이름으로 파일을 저장한다.
    }
  })
});

WriteController.post(`/write`, upload.single('avatar') , (req, res) => {
  const postInfo: Post = {
    user_number: Number(req.param('user_number')),
    content: req.param('content')
  };
  const fileInfo: Files = {
    file_name: req.file.filename,
    file_url: req.file.path,
    file_size: req.file.size,
    file_type: req.file.mimetype,
    original_name: req.file.originalname
  };
  writeService.postWrite(postInfo, fileInfo)
  .then(result => {
    return res.json(result);
  });
});
