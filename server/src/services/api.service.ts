import Image from '../models/image.model';
import * as request from 'request-promise';
import { ServerConfig } from '../config';
import * as Promise from 'bluebird';

export class ApiService {

    getImages(i: number, count: number, images: any[] = []): Promise<any> {
        const options = ServerConfig["imgur-options"];
        options.uri += i;

        return request(ServerConfig["imgur-options"]).then((response: any) => {
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
                    tags.push(gallery.tags[j].display_name)
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
                }
                if (!newImage.img_link) {
                    console.log(image)
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
        return Image.deleteMany({}).then(() => {
            return this.getImages(0, ServerConfig['max-images']).then((images: []) => {
                return Image.insertMany(images);
            })
        })
    }
    search(term: string) {
        const search: any = {
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
        return Image.find(search);
    }
};