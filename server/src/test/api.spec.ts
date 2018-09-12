import { expect } from 'chai';
import * as request from 'request-promise';
import { ApiService } from '../services/api.service';
import { AppServer } from '../server';
import Image from '../models/image.model';

let server = new AppServer();
after(() => {
    server.close();
});

describe('Test the getImages() functions', () => {
    let api = new ApiService();
    it('should retrieve 100 images', done => {
        api.getImages(0, 100).then(response => {
            expect(response);
            expect(response.length).to.equal(100);
            done();
        });
    });
    it('should retrieve 324 images', done => {
        api.getImages(0, 324).then(response => {
            expect(response);
            expect(response.length).to.equal(324);
            done();
        });
    });
});

describe('POST /api/update', () => {
    it('should update the list of images', done => {
        request('http://localhost:8080/api/update', { method: "POST" }).then(response => {
            expect(response);
            Image.countDocuments({}).then(count => {
                expect(count).to.equal(100);
                done();
            })
        });
    });
});

describe('GET /api/search/:term', () => {
    it('should find a couple of images', done => {
        request('http://localhost:8080/api/search/t', { method: "GET" }).then(response => {
            expect(response);
            let parsedResponse = JSON.parse(response);
            expect(parsedResponse).to.be.an('array');
            expect(parsedResponse.length).to.be.greaterThan(3);
            done();
        });
    });
});