"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const api_service_1 = require("../services/api.service");
class ApiController extends controller_1.Controller {
    constructor(service = new api_service_1.ApiService) {
        super(service);
        this.router.get('/search/:term', (req, res) => {
            this.service.search(req.params.term).then(results => {
                res.status(200).send(results);
            }).catch(err => {
                console.error(err);
                res.sendStatus(501);
            });
        });
        this.router.get('/search/', (req, res) => {
            res.status(200).send([]);
        });
        this.router.post('/update', (req, res) => {
            this.service.updateImages().then(() => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(501);
            });
        });
    }
}
exports.ApiController = ApiController;
