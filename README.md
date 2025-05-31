# Photofolio
📸 Photofolio — Full Stack Image Album Manager
Photofolio is a full-stack web application that allows users to create and manage photo albums, add image URLs, and view images in each album. Built using the MERN stack (MongoDB, Express, React, Node.js), it offers a smooth UI and RESTful API integration for dynamic album management.

🔧 Tech Stack
Frontend:

React (CRA-based)

HTML/CSS (custom styling)

Backend:

Node.js

Express.js

MongoDB with Mongoose

Multer (for future file upload support)

CORS & dotenv for configuration

🚀 Features
Create new photo albums

Add images to any album via URL

View all images in an album

Responsive and clean user interface

Integrated with MongoDB via REST APIs

📁 Project Structure
bash
Copy
Edit
/photofolio          # React Frontend
  ├── src
  │   ├── App.js
  │   ├── home.js
  │   └── index.css
  └── public
      └── back.png, front.png, pp2.png

/server              # Express Backend
  ├── server.js
  ├── /src
      ├── /features
      │    ├── albums
      │    │    ├── albums.routes.js
      │    │    └── albums.schema.js
      │    └── images
      │         ├── images.routes.js

      │         └── images.schema.js
      └── /config
           └── mongooseConfig.js


           <img width="960" alt="P1" src="https://github.com/user-attachments/assets/d4d5861e-5f51-4046-96bf-6eff98f592ed" />
