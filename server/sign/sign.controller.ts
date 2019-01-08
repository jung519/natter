import { Router } from 'express';
import { SignService } from './sign.service';
import { NotFound } from 'ts-httpexceptions';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import SignDao from './sign.dao';
import { google } from 'googleapis';
import { SignAuth } from '../../common/interfaces/user';
import { environment } from '../../src/environments/environment';
import { request } from 'http';
// import * as localStorage from 'localStorage';
const localStorage = require('localStorage');

export const signController = Router();
const signService = new SignService(new SignDao);
export const tokenSign = (info) => {
  return  jwt.sign(info, config.jwt.natter.secret, {expiresIn: config.jwt.natter.expiresIn});
};

const oauthInfo = new google.auth.OAuth2(
  config.oauth.google.client_id,
  config.oauth.google.client_secret,
  config.oauth.google.redirectUri
);


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
    const token = tokenSign(returnValue);
    return res.json({token});
  })
  .catch(err => {
    console.log('err =', err);
    return err;
  });
});



// 회원가입
signController.post('/signup', (req, res) => {
  const options: SignAuth = {
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


// 구글 oauth
signController.get('/oauth/open_google', (req, res) => {
  const scope = [
    config.oauth.google.scope.profile,
    config.oauth.google.scope.email
  ];

  const returnValue = oauthInfo.generateAuthUrl({
    access_type: config.oauth.google.access_type,
    scope: scope
  });
  return res.json(returnValue);
});

// 구글 oauth redirectUrl
signController.get('/oauth/getCode', (req, res) => {
  const code = req.param('code');
  const err = req.param('error');
  async function getFnToken(code) {
    const {tokens} = await oauthInfo.getToken(code);
    return tokens;
  }
  if (!err) {
    getFnToken(code)
    .then(r => {
      oauthInfo.setCredentials(r);

      const oauth = google.oauth2({
        version: 'v1',
        auth: oauthInfo
      });

      async function getUserData() {
        return await oauth.userinfo.get({
          oauth_token: r.access_token
        });
      }

      getUserData()
      .then(result => {
        const options: SignAuth = {
          email: result.data.email,
          user_name: result.data.name,
          password: config.temporaryPassword.pw
        };
        signService.processSimpleSign(options)
        .then(callback => {
          const {result: {dataValues}} = callback;
          const token = tokenSign(dataValues);
          const url = require('url');
          res.redirect(`${environment.natter_url}/#/sign?token=${token}`);
        });
      });
    });
  }
});
