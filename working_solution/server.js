"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const config_1 = require("./config");
const api_controller_1 = require("./controllers/api.controller");
class AppServer {
    constructor() {
        this.initServer();
        this.config();
        this.routes();
        this.startServer();
    }
    initServer() {
        this.app = express();
        this.server = http_1.createServer(this.app);
        this.port = process.env.PORT || AppServer.PORT;
    }
    config() {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        mongoose.Promise = global.Promise;
        mongoose.connect(config_1.ServerConfig.connectionString, { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
    }
    routes() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        const apiController = new api_controller_1.ApiController();
        this.app.use('/api', apiController.getRouter());
    }
    startServer() {
        this.server = this.app.listen(this.port, () => {
            console.log("Server listening on port %s", this.port);
        });
    }
    close() {
        this.server.close();
        mongoose.disconnect();
    }
    getApp() {
        return this.app;
    }
}
AppServer.PORT = 8080;
exports.AppServer = AppServer;
