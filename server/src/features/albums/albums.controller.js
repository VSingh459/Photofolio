import AlbumsRepository from "./albums.repository.js";

export default class AlbumsController{

    addAlbum(req,res){

        const n = req.body.name;

        return AlbumsRepository.addition(n)
        .then(function(result){
            res.status(201).send(result);
        }).catch(function(error){
            console.error('Unexpected error in Album controller:', error);
            res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
        });
    }

    allAlbums(req,res)
    {
        return AlbumsRepository.getAll().then(function(result){
            res.status(200).send(result);
        }).catch(function(error){
            console.error("Error fetching albums in controller:", error);
            res.status(500).json({ error: "An error occurred while fetching albums. Please try again later." });

        })
    }
}