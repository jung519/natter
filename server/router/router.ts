import * as express from 'express';
import { IServer } from '../interfaces/ServerInterface';
import { signController } from '../sign/sign.controller';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);
        server.app.use('/', signController);
    }
}
