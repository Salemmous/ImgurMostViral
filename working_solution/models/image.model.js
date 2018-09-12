"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    gallery_id: { type: String, required: true, unique: true },
    gallery_title: { type: String, required: true },
    gallery_desc: String,
    gallery_link: { type: String, required: true, unique: true },
    gallery_topic: String,
    gallery_section: String,
    user: String,
    img_title: String,
    img_desc: String,
    img_link: { type: String, required: true, unique: true },
    tags: [String]
});
const Image = mongoose.model('Image', ImageSchema);
exports.default = Image;
