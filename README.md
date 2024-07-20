# NodeJS Ecommerce Project
## Overview
This project is a Node.js-based eCommerce application that allows users to log in and out, manage products, and handle cart functionality. The application supports user roles, including super admins and regular users, and offers a minimal frontend interface. Due to time constraints(office workload), the frontend and test case implementations are incomplete.

### Features
#### User Authentication:
Login and logout functionality.
Upon logging in, users are greeted with a welcome message: "Hello, email-of-the-user!"
#### Role Management:
Users can be assigned roles of either super_admin or user.
#### Product Management:
Super admins can manage products, including adding products with an image, title, description, and price.
#### Product Browsing:
Regular users can browse products and add them to their cart.
#### Cart Management:
Users can add multiple products to their cart.
Users can review their cart and proceed to checkout.
At checkout, users must provide a shipping address, and the cart is cleared upon successful checkout.
#### Email Notifications:
An email notification is sent to users after a successful cart checkout.
Technologies Used
## Backend:

Node.js
Express.js
MongoDB with Mongoose
JWT for authentication
Multer for handling file uploads
Nodemailer for sending emails


Setup and Installation
Backend Setup
Clone the Repository:

   
  
git clone https://github.com/ritesh-2124/Codemancers-NodeJS.git

cd Codemancers-NodeJS


Install Dependencies: 
npm install

Create a .env File:

Create a .env file in the root directory with the following content:

# env
  
### For testing purpose of email i have used etereal email you can create new one from https://ethereal.email/


MONGO_URI=your_mongo_uri

JWT_SECRET=Codemancers@Ritesh

EMAIL=alena.adams@ethereal.email

EMAIL_PASSWORD=tmp9TFdKSsS5Sb4zdY

PORT=5000

Start the Server:

## npx ts-node src/server.ts

# Testing
Note: Test cases for the APIs are not yet implemented due to time constraints.

## Testing Frameworks:
Consider using Mocha, Jest, or any other testing framework to write unit and integration tests.

# API Endpoints

## User Authentication:

POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and receive a JWT token.

## Product Management:

POST /api/products - Add a new product (super admin only).
GET /api/products - Get a list of products.
Cart Management:

POST /api/cart/add - Add a product to the cart.
GET /api/cart - Review the cart.
POST /api/cart/checkout - Checkout the cart.


## Known Issues
The frontend implementation is not complete.
Test cases are missing.
