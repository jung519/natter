import * as Bluebird from 'bluebird';
import { SQ } from '../server/sequelize';
import * as files from './interfaces/files';
import { Files } from '../server/models/files';

export default class Dao extends SQ {
  constructor() {
    super();
  }

  async file_upload(options: files.Files): Bluebird<any> {
    return await Files.create({
      file_name: options.file_name,
      file_url: options.file_url,
      file_size: options.file_size,
      file_type: options.file_type,
      create_date: new Date(),
      original_name: options.original_name
    });
  }
}
