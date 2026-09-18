# BookNest 📚

BookNest is an e-commerce website for independent bookstores.

The main idea of this project is to give small bookstores an online platform where they can manage their books and inventory, while customers can search for books, purchase them, and give reviews.

## About the Project

Independent bookstores usually have less online presence compared to large online platforms. BookNest is designed to provide the basic features needed to manage a bookstore online.

Customers can:
- Create an account and login
- Browse books
- Search and filter books
- View book details
- Check availability
- Add books to cart
- Place orders
- View previous orders
- Give ratings and reviews
- View details about second-hand books

The admin can:
- Add, edit and delete books
- Manage categories
- Update inventory
- Manage orders
- Update order status
- Manage reviews
- Add information about second-hand books

## Main Features

### Book Catalog
Customers can browse the available books and view information such as title, author, price, category and availability.

### Search and Filter
Books can be searched and filtered based on different options such as title, category, price and availability.

### Cart and Checkout
Customers can add books to their cart, change quantities and proceed to checkout.

Payment will initially use a **mock payment system** for the project.

### Orders
Customers can view their orders and order status.

The admin can update the status of an order.

Order status:

- Placed
- Confirmed
- Packed
- Shipped
- Delivered
- Cancelled

### Inventory
The admin can check and update the available stock of books.

### Reviews and Ratings
Customers can give ratings and write reviews for books.

### Second-Hand Books
BookNest also includes a section for second-hand books.

The condition of a second-hand book can be shown using:

- Like New
- Very Good
- Good
- Acceptable

Additional details such as cover condition, page condition and visible wear can also be provided.

### Help Me Choose a Book

This is one of the additional features planned for BookNest.

It will help users find books based on their preferences.

## Technology Used

### Frontend
- React
- TypeScript

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Other Technologies
- Redis
- REST API
- Docker
- Git
- GitHub

## Project Structure

The project is being developed using separate frontend and backend folders.

```text
BookNest
│
├── client
│   └── React + TypeScript
│
├── server
│   └── Node.js + Express.js
│
├── database
│
├── README.md
└── .gitignore
