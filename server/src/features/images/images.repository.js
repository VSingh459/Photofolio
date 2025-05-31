import imageModel from "./images.schema.js";


export default class ImageRepository{

    static addition(name, url,albumId){

        const i = {
            title: name,
            url: url,
            albumId: albumId,
        }

        const image = new imageModel(i);
        return image.save().then(function(response){
            return response;
        }).catch(function(error){
            console.error('There is error in repository: ', error);
            throw error;
        })

    }

    static gettingAll(albumId)
    {
        return imageModel.find({ albumId }) // Filter images by albumId
        .then(function(images) {
            return images;
        })
        .catch(function(error) {
            console.error('Error while fetching images for album:', error);
            throw error;
        });

    }
}