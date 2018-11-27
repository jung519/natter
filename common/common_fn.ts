import * as multer from 'multer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { folderSet } from './common_enum';


export class CommonFn {
  makeFolderAndNowDate = () => {
    const dateObj = new Date();
    // const folderPath = __dirname + `/../dist/file/img/${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDay()}`;
    const folderPath = '~/file';
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
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





