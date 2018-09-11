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
        this.router.post('/update', (req, res) => {
            this.service.updateImages().then(() => {
                res.sendStatus(200);
            }).catch(err => {
                console.error(err);
                res.sendStatus(501);
            });
        });
        /*this.router.get('/list', (req, res) => {
            this.service.list(res);
        });
        this.router.post('/update/:id', (req, res) => {
            if ((<any>req).user.type != 2003 && !(<any>req).user.admin)
                res.sendStatus(403);
            else
                service.update(req.params.id, <IImage>req.body, res);
        });
        this.router.post('/add', (req, res) => {
            if ((<any>req).user.type != 2003 && !(<any>req).user.admin)
                res.sendStatus(403);
            else
                service.create(<IImage>req.body, res);
        });
        this.router.get('/suggestions/:query', (req, res) => {
                service.suggestions(req.params.query, res);
        });*/
    }

}