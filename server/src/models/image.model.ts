import * as mongoose from 'mongoose';

export interface IImage extends mongoose.Document {
    _id: mongoose.Types.ObjectId;

    gallery_id: string;
    gallery_title: string;
    gallery_desc: string;
    gallery_link: string;
    gallery_topic: string;
    gallery_section: string;

    user: string;

    img_title: string;
    img_desc: string;
    img_link: string;
    tags: string[];
}
const ImageSchema = new mongoose.Schema({
    gallery_id: { type: String, required: true, unique: true },
    gallery_title: { type: String, required: true},
    gallery_desc: String,
    gallery_link: { type: String, required: true, unique: true },
    gallery_topic: String,
    gallery_section: String,

    user: String,

    img_title: String,
    img_desc: String,
    img_link: {type: String, required: true, unique: true},

    tags: [String]
});

const Image = mongoose.model<IImage>('Image', ImageSchema);
export default Image;