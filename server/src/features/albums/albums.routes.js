import express from 'express';
import AlbumsController from './albums.controller.js';

const alRouter = express.Router();
const alControl = new AlbumsController();

alRouter.post('/add', alControl.addAlbum);
alRouter.get('/all', alControl.allAlbums);

export default alRouter;