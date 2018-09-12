"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_model_1 = require("../models/image.model");
const request = require("request-promise");
const config_1 = require("../config");
class ApiService {
    getImages(i, count, images = []) {
        const options = config_1.ServerConfig["imgur-options"];
        options.uri += i;
        return request(config_1.ServerConfig["imgur-options"]).then((response) => {
            response = JSON.parse(response);
            response = response.data;
            for (let i = 0; i < response.length; i++) {
                const gallery = response[i];
                let image = {
                    description: gallery.description,
                    title: gallery.title,
                    link: gallery.link,
                    gifv: gallery.link
                };
                if (gallery.images)
                    image = gallery.images[0];
                const tags = [];
                for (let j = 0; gallery.tags && j < gallery.tags.length; j++) {
                    tags.push(gallery.tags[j].display_name);
                }
                const newImage = {
                    gallery_id: gallery.id,
                    gallery_title: gallery.title,
                    gallery_desc: gallery.description,
                    gallery_link: gallery.link,
                    gallery_topic: gallery.topic,
                    gallery_section: gallery.section,
                    user: gallery.account_url,
                    tags: tags,
                    img_desc: image.description,
                    img_title: image.title,
                    img_link: image.gifv || image.link
                };
                if (!newImage.img_link) {
                    console.log(image);
                }
                images.push(newImage);
            }
            if (images.length < count)
                return this.getImages(i + 1, count, images);
            else {
                images.splice(count);
                return images;
            }
        });
    }
    updateImages() {
        return image_model_1.default.deleteMany({}).then(() => {
            return this.getImages(0, config_1.ServerConfig['max-images']).then((images) => {
                return image_model_1.default.insertMany(images);
            });
        });
    }
    search(term) {
        const search = {
            $or: [
                {
                    gallery_id: { $regex: term, $options: 'i' }
                },
                {
                    gallery_title: { $regex: term, $options: 'i' }
                },
                {
                    gallery_desc: { $regex: term, $options: 'i' }
                },
                {
                    gallery_topic: { $regex: term, $options: 'i' }
                },
                {
                    gallery_section: { $regex: term, $options: 'i' }
                },
                {
                    user: { $regex: term, $options: 'i' }
                },
                {
                    img_title: { $regex: term, $options: 'i' }
                },
                {
                    img_desc: { $regex: term, $options: 'i' }
                },
                {
                    tags: { $regex: term, $options: 'i' }
                },
            ]
        };
        return image_model_1.default.find(search);
    }
}
exports.ApiService = ApiService;
;
