import * as express from 'express';

export class Controller {

    protected router: express.Router = express.Router();

    protected service: any;

    constructor(service: any) {
        this.service = service;
    }

    public getRouter(): express.Router {
        return this.router;
    }
}
//90010190240