import { Router } from 'express';
import { SignService } from './sign.service';
import { NotFound } from 'ts-httpexceptions';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import SignDao from './sign.dao';

export const signController = Router();
const signService = new SignService(new SignDao);

// 로그인
signController.post('/auth/token', (req, res) => {
  const options: any = {};
  options.email = req.param('email');
  options.password = req.param('password');
  signService.getSignPermission(options)
  .then(returnValue => {
    if (!returnValue) {
      return new NotFound('없는 아이디 입니다.');
    }
    const token = jwt.sign(returnValue, config.jwt.natter.secret, {expiresIn: config.jwt.natter.expiresIn});
    return res.json({token});
  })
  .catch(err => {
    console.log('err =', err);
    return err;
  });
});


// 회원가입
signController.post('/signup', (req, res) => {
  const options: any = {
    email: req.param('email'),
    user_name: req.param('user_name'),
    password: req.param('password'),
    introduce: req.param('introduce')
  };
  signService.addSignUp(options)
  .then(result => {
    return res.json(result);
  });
});
