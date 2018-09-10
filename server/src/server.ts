import { createServer, Server } from 'http';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';

import { ServerConfig } from './config';


export class AppServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private port: string | number;

    constructor() {
        this.initServer();
        this.config();
        this.routes();
        this.startServer();
    }

    private initServer() {
        this.app = express();


        this.server = createServer(this.app);
        this.port = process.env.PORT || AppServer.PORT;
    }

    private config() {
        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(ServerConfig.connectionString);

    }
    private routes() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        let apiRouter: express.Router = express.Router();

        /*const users: UsersController = new UsersController();

        apiRouter.use('/users', users.getRouter());*/

        this.app.use('/api', apiRouter);

    }

    private startServer() {
        this.server.listen(this.port, () => {
            console.log("Server listening on port %s", this.port);
        });
    }
    public getApp() {
        return this.app;
    }
}