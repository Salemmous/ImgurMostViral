import Image from '../models/image.model';

export class ApiService {
    updateImages() {

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