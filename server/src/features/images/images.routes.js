import express from 'express';
import ImageController from './images.controller.js';

const imRouter  = express.Router();
const imCont = new ImageController();

imRouter.post('/add',imCont.adder);
imRouter.get('/:albumId',imCont.getAll);

export default imRouter;