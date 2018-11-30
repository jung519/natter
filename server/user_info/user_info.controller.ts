import { Router } from 'express';
import UserInfoService from './user_info.service';
import UserInfoDao from './user_info.dao';
import { User } from '../../common/interfaces/user';
import { Files } from '../../common/interfaces/files';
import { CommonFn } from '../../common/common_fn';

export const UserInfoController = Router();
const userInfoService = new UserInfoService(new UserInfoDao);
const commonFn = new CommonFn();

UserInfoController.put(`/info`, commonFn.multer().single('profile'), (req, res) => {
  const options: User = {
    user_name: req.param('user_name'),
    introduce: req.param('introduce'),
    user_number: Number(req.param('user_number'))
  };
  let profile_file: Files = null;
  if (req.file) {
    profile_file = {
      file_name: req.file.filename,
      file_url: req.file.path,
      file_size: req.file.size,
      file_type: req.file.mimetype,
      original_name: req.file.originalname
    };
  }

  userInfoService.putUserInfo(options, profile_file)
  .then(result => {
    return res.json(result);
  });
});

UserInfoController.get(`/follow_info`, (req, res) => {
  const user_number = req.param('user_number');
  userInfoService.getFollowInfo(Number(user_number))
  .then(result => {
    return res.json(result);
  });
});
