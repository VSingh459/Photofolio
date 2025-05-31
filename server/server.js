import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import {connectUsingMongoose} from "./src/config/mongooseConfig.js";
import alRouter from "./src/features/albums/albums.routes.js";
import imRouter from "./src/features/images/images.routes.js";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = express();
dotenv.config();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//CORS Configuration
// const corsOptions = {
//     origin: 'http://localhost:3000', // Allow requests from React's dev server
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };
// server.use(cors(corsOptions)); // Use CORS middleware   

// Serve React app
server.use(express.static(path.resolve(__dirname, '../photofolio/build')));

// Routes
server.use('/api/albums', alRouter);
server.use('/api/images', imRouter);




// Fallback to React for non-API routes
// server.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../photofolio/build', 'index.html'));
// });

let a = connectUsingMongoose(); 

a.then(function () {
    server.listen(3002, function () {
        console.log('Server is listening at port-3002');
    });
})
.catch(function (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); 
});