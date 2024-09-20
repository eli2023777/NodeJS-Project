# NodeJS-Project
# Business Card Management Project

This is a Full-Stack application for managing business cards. The application allows users to register, create, view, edit, like, and delete business cards. There are three types of users in the system: Regular users, Business users, and Admins.

## Technologies Used
- **Node.js** - Back-end server
- **Express.js** - Web framework
- **MongoDB** - NoSQL Database (with MongoDB Atlas for production)
- **Mongoose** - ODM for MongoDB
- **JWT (JSON Web Tokens)** - For authentication
- **Bcrypt** - For password hashing
- **dotenv** - For environment variable management
- **Morgan** - HTTP request logger
- **CORS** - For handling cross-origin requests
- **Chalk** - For colorful logging
- **Bootstrap** - Front-end styling (if applicable)
- **Joi** - For validating request bodies and user inputs

## Project Features
- **User Authentication**: Secure registration and login system.
- **Admin Dashboard**: Admins can view and manage all users and business cards.
- **Business Cards Management**: Business users can create, edit, and delete their cards.
- **Likes System**: All logged-in users can like/unlike cards.
- **Roles**: 
  - Regular User: Can register, like cards, view their own cards.
  - Business User: Can create and manage business cards.
  - Admin: Can manage users and all business cards.
- **Input Validation**: Joi is used to validate user input for security and consistency.

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas for production)
