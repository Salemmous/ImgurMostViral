import { createServer, Server } from 'http';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';

import { ServerConfig } from './config';
import { ApiController } from './controllers/api.controller';
import { exists } from 'fs';


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
        mongoose.connect(ServerConfig.connectionString, { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);

    }
    private routes() {
        this.app.use(express.static(path.join(__dirname, 'public')));

        const apiController: ApiController = new ApiController();

        this.app.use('/api', apiController.getRouter());

    }

    private startServer() {
        this.server = this.app.listen(this.port, () => {
            console.log("Server listening on port %s", this.port);
        });
    }
    public close() {
        this.server.close();
        mongoose.disconnect();
    }
    public getApp() {
        return this.app;
    }
}