import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import { signController } from '../sign/sign.controller';
import { UserInfoController } from '../user_info/user_info.controller';
import { WriteController } from '../write/write.controller';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);
        server.app.use('/', signController);
        server.app.use('/user_info', UserInfoController);
        server.app.use('/write', WriteController);
    }
}
