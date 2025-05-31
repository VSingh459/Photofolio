import mongoose from 'mongoose';

const albumsSchema = new mongoose.Schema({

    name: {type: String,
        required: true,
        maxLength: [25,"Name can't be greater than 25 characters"]
    },

    imageRefs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image' // Reference to the images collection
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const albumModel = mongoose.model('albums',albumsSchema);

export default albumModel;