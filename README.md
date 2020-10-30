# streetwear-apparel-store

A simple online shop interface for an independent streetwear apparel brand.

![Product catalog](docs/streetwear_1.jpg)
![Checkout](docs/streetwear_2.jpg)

## Getting Started:

Setup the database:

```sh
cd server
mysql -u root < db.sql
```

Start the server:

```sh
cd server
npm install
npm start
```

Start the client:

```sh
cd client
npm install
npm start
```

## What The App Does

* Shows all items
* Gives detail on individual items on hover/click (price/description/colour)
* Allows user to add item(s) to cart
* Allows users to remove item(s) from cart

### Feature Extension

* Add product image to basket view
* Allow users to save items to cart to retrieve later
* Store inventory on back end database
* Create user account to save personal details
* Assign order history to user account
* Drop-down select menu for items to select size and/or quantity
* Client interface to add/remove/update items
* Larger amount of inventory should include some method of filtering products (i.e. t-shirts/hats/etc.)
* Submit form to go to a nominated email address?

### Userflow

![Sitemap](docs/sitemap.jpg)

* Nav bar on top of screen (shop/cart/about)
* Shop page displays all items (likely 8 max)
* On clicking an item, dedicated page will show product name, description, price, size selector(?), 'add to basket' button + back to shop
* Basket page shows items already in cart, or 'empty'
* Basket page should allow deletion of items
* About page with contact form
* Design for web & for mobile view

### Data

* Stored initially as array of objects in separate JS file
* Stock item to include:
    - ID number
    - name/title
    - description
    - price
    - colour
    - size(s)
    - image link

![Database schema](docs/schema.jpg)

* 2x tables; 1x for stock, 1x for storing quantities of stock by size

### API routes

* GET /product : returns all products
* GET /basket : returns all items in the shopping basket
* POST /basket : adds a new item to the shopping basket
* PUT /basket : updates an item in the shopping basket
* DELETE /basket : removes an item from the shopping basket
