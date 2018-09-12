"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Controller {
    constructor(service) {
        this.router = express.Router();
        this.service = service;
    }
    getRouter() {
        return this.router;
    }
}
exports.Controller = Controller;
//90010190240
