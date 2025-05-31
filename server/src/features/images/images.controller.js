import ImageRepository from "./images.repository.js";

export default class ImageController{

    adder(req,res){
        const n = req.body.title;
        const url = req.body.url;
        const albumId = req.body.albumId;

        return ImageRepository.addition(n,url,albumId).then(function(result){
            res.status(201).send(result);
        }).catch(function(error){
            console.error('Unexpected error in Image controller:', error);
            res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });

        });
    }

    getAll(req,res)
    {
        const albumId = req.params.albumId;

        return ImageRepository.gettingAll(albumId).then(function(result){
            res.status(200).send(result);
        }).catch(function(error){
            console.error('Unexpected error in Image controller:', error);
            res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
        });
    }
}