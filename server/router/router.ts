import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import { signController } from '../sign/sign.controller';
import { UserInfoController } from '../user_info/user_info.controller';
import { WriteController } from '../write/write.controller';
import { PostController } from '../post/post.controller';
import { CommonCodeController } from '../common_code/common_code.controller';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);
        server.app.use('/', signController);
        server.app.use('/user_info', UserInfoController);
        server.app.use('/write', WriteController);
        server.app.use('/post', PostController);
        server.app.use('/common_code', CommonCodeController);

        server.app.use(express.static('public'));
    }
}
