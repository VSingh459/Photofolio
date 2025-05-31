import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, "Title can't exceed 50 characters"]
    },
    url: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/,
            'Please provide a valid image URL'
        ]
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'albums', // References the albums collection
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const imageModel = mongoose.model('Image', imageSchema);

export default imageModel;
