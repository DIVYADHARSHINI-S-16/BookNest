# BookNest 📚

BookNest is an e-commerce website for independent bookstores. The main idea of this project is to give small bookstores an online platform where they can manage their books and inventory, while customers can search for books, purchase them, and give reviews.

**Phase 1 is complete and fully functional** - this README reflects what has actually been built, not just what was planned.

## About the Project

Independent bookstores usually have less online presence compared to large online platforms. BookNest provides the basic features needed to manage a bookstore online, including support for second-hand books alongside new ones.

### Customers can:
- Create an account and log in
- Browse books
- Search and filter books (by title, author, category, price, availability)
- View book details, ratings, and reviews
- Check availability
- Add books to cart, adjust quantities, remove items
- Place orders (mock payment)
- View previous orders and order status
- Give ratings and reviews
- View condition details of second-hand books before purchasing

### The admin can:
- Add, edit, and delete books
- Manage categories
- Update inventory stock
- View all orders and update order status
- Manage (remove) reviews
- Add and edit second-hand book condition information
- View a live dashboard (total books, customers, orders, reviews, revenue, low-stock alerts)

## Main Features

### Book Catalog
Customers browse the full catalog with title, author, price, category, availability, and average rating shown per book.

### Search and Filter
Books can be searched and filtered by title/author/description, category, price range, and stock availability, and sorted by newest, title, or price.

### Cart and Checkout
Customers add books to their cart, adjust quantities, and check out with a shipping address. Payment uses a mock payment system, clearly labeled as MOCK, with no real gateway integrated and no card data collected. Stock is reserved the moment an item is added to cart (so two customers can't both buy the last copy) and permanently deducted once an order is placed.

### Orders
Customers can view their order history and order details. The admin can update order status through:
- Placed
- Confirmed
- Packed
- Shipped
- Delivered
- Cancelled

### Inventory
The admin can view and update the available stock of each book directly from the admin panel.

### Reviews and Ratings
Customers can rate (1-5 stars) and write a review for any book; the average rating is shown on both the catalog and detail pages.

### Second-Hand Books
BookNest includes a dedicated second-hand section. Condition is graded as:
- Like New
- Very Good
- Good
- Acceptable

Additional details - cover condition, page condition, visible wear, and general notes - are shown to customers on the book detail page before they buy. (Note: condition currently applies to a book's entire stock, not per individual copy - see Limitations below.)

## Technology Used

**Frontend**
- React
- TypeScript
- Vite
- React Router

**Backend**
- Node.js
- Express.js
- TypeScript

**Database**
- PostgreSQL

**Other Technologies**
- Redis
- REST API
- Docker
- JWT authentication + bcrypt
- Git / GitHub

## Project Structure
booknest/
├── client/          React + TS + Vite frontend (port 5173)
│   └── src/
│       ├── api/          Fetch wrapper for backend calls
│       ├── context/       Auth, Cart, Toast state
│       ├── components/    Shared UI (Navbar, BookCard, admin shell, etc.)
│       ├── pages/          Customer pages + admin/ subfolder
│       ├── routes/         RequireAuth, RequireAdmin guards
│       └── styles/         Design system (global.css)
├── server/          Express + TS backend (port 4000)
│   └── src/
│       ├── controllers/    Business logic per resource
│       ├── routes/         Express route definitions
│       ├── middleware/     Auth, error handling
│       ├── db/              Schema, migrations, seed data, pool
│       ├── config/          Redis client
│       └── utils/           JWT, password hashing, validation
├── docker-compose.yml
└── package.json     (npm workspaces root)


## Setup Instructions

### 1. Environment variables
```bash
cp server/.env.example server/.env
```
Set a strong random `JWT_SECRET` in `server/.env`.

### 2. Start PostgreSQL + Redis
```bash
docker compose up -d postgres redis
```

### 3. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Apply schema, migrations, and seed data
```bash
cd server
npm run db:migrate
npm run db:seed
```

### 5. Run the app
```bash
# Terminal 1
cd server && npm run dev   # http://localhost:4000

# Terminal 2
cd client && npm run dev   # http://localhost:5173
```

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Customer | customer@booknest.com | Customer@123 |
| Admin | admin@booknest.com | Admin@123 |

## Phase 1 Limitations

- Mock payment only - no real gateway; checkout always succeeds instantly, no card data collected.
- Second-hand condition is per-title, not per-copy - a book is marked second-hand as a whole; there's no way to sell some new and some used copies of the same title separately.
- No wishlist, no email/SMS notifications, no analytics beyond the basic dashboard.
- "Help Me Choose" recommendation feature was planned but explicitly deferred to a later phase.
- No automated test suite - Phase 1 was tested manually end-to-end.
- Single shipping address per order - no saved address book.

## Phase 2 Planned Features

- Wishlist / saved-for-later
- Order status email notifications
- Per-copy second-hand inventory tracking
- "Help Me Choose" recommendation logic
- Sales analytics dashboard with charts and trends
- Saved shipping addresses
- Coupon/discount codes

## Phase 3 Planned Features

- Real payment gateway integration (Razorpay/Stripe)
- Automated test suite (unit + integration)
- Multi-image book galleries
- Seller/vendor accounts for a marketplace model
- Advanced search (typo-tolerant, faceted filtering)
- Order return/refund workflow
- Real-time order tracking notifications
