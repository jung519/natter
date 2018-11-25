import * as Sequelize from 'sequelize';
import sequelize from '../sequelize';
import * as files from '../../common/interfaces/files';

interface FilesModel extends Sequelize.Model<FilesModel , files.Files> {
  file_number?: number;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  create_date?: Date;
}

export const Files = sequelize.define<FilesModel, files.Files>('files', {
  file_number: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  file_url: {type: Sequelize.STRING},
  file_name: {type: Sequelize.STRING},
  file_size: {type: Sequelize.INTEGER},
  file_type: {type: Sequelize.STRING},
  create_date: {type: Sequelize.DATE},
  original_name: {type: Sequelize.STRING}
}, {
  classMethods: {},
  tableName: 'files',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
});
