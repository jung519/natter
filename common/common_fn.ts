import * as multer from 'multer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { folderSet } from './common_enum';
// import {  } from 'mkdirp';


export class CommonFn {
  makeFolderAndNowDate = () => {
    const dateObj = new Date();
    const root = path.normalize(`${__dirname}/../`);
    console.log(root);
    const folderPath = root + `/public/${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDay()}`;
    if (!fs.existsSync(folderPath)) {
      // make_dir.
    }
    return folderPath;
  }

  multer = () => {
    const fileName = this.replaceFileName;
    const folderPath = this.makeFolderAndNowDate;
    const upload = multer({
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: multer.diskStorage({
        destination(req, file, cb) {
          // cb(null, folderPath()); // 저장폴더
          cb(null, 'public'); // 저장폴더
        },
        filename(req, file, cb) {
          cb(null, fileName(file.originalname, file.mimetype) // 파일 이름 변경후 저장
          );
        }
      })
    });

    return upload;
  }

  private replaceFileName(originalname: string, type: string) {
    const typeObj = type.split('/');
    const hashName = crypto.createHash('sha256').update(originalname + new Date()).digest('hex');
    return `${hashName}.${typeObj[1]}`;
  }


}





