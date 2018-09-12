import { Controller } from './controller';
import { ApiService } from '../services/api.service';

export class ApiController extends Controller {

    constructor(service: ApiService = new ApiService) {
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