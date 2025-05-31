import mongoose from 'mongoose';
import albumModel from "./albums.schema.js";

export default class AlbumsRepository{

    static addition(name)
    {
        const n = name;
        const album = new albumModel({name: n});
        return album.save().then(function(result){
            return result;
        }).catch(function(error){
            console.error('There is error in repository: ', error);
            throw error;
        });
    }

    static getAll(){
        return albumModel.find({}).then(function(albums){
            return albums;
        }).catch(function(error){
            console.error("Error fetching albums:", error);
            throw error;
        })
    }
}