import { Router } from 'express';
import UserInfoService from './user_info.service';
import UserInfoDao from './user_info.dao';
import { User } from '../../common/interfaces/user';

export const UserInfoController = Router();
const userInfoService = new UserInfoService(new UserInfoDao);

UserInfoController.put(`/info`, (req, res) => {
  const options: User = {
    email: req.param('email'),
    user_name: req.param('user_name'),
    introduce: req.param('introduce')
  };
  userInfoService.putUserInfo(options)
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
