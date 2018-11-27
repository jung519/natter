import { Router } from 'express';
import { CommonCodeService } from './common_code.service';
import { CommonCodeDao } from './common_code.dao';
import { CommonCode } from '../../common/interfaces/common_code';

export const CommonCodeController = Router();
const commonCodeService = new CommonCodeService(new CommonCodeDao);

// 코드 조회
CommonCodeController.get(`/info`, (req, res) => {
  const cd = req.param('code');
  commonCodeService.getCodeInfo(cd)
  .then(result => {
    return res.json(result);
  });
});

// 하위 코드 목록 조회
CommonCodeController.get(`/list`, (req, res) => {
  const up_cd = req.param('up_cd');
  commonCodeService.getCodeList(up_cd)
  .then(result => {
    return res.json(result);
  });
});
