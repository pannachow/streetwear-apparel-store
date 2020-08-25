# mvp-project-1
A simple online shop interface for an independent apparel brand

## What the app does
* Shows all items
* Gives detail on individual items on hover/click (price/description/size)
* Allows user to add item(s) to cart
* Allows users to remove item(s) from cart

### Feature expansion
* Create user account to save personal details
* Assign order history to user account
* Checkout process?
* Client interface to add/remove/update items
* Larger amount of inventory should include some method of filtering products (i.e. t-shirts/hats/etc.)

### Userflow
![Sitemap](images/sitemap.jpg)
* Nav bar on top of screen (shop/cart/about)
* Shop page displays all items (likely 8 max)
* On clicking an item, window will open with larger image, product name, description, price, size selector(?), 'add to cart' button + close window
* Cart page shows items already in cart, or 'empty'
* Cart page should allow deletion of items
* About page (text only)
* Design for web & for mobile view


### Database schema
![Database schema](images/schema.jpg)
* 2x tables; 1x for stock, 1x for storing quantities of stock by size
** Is another table needed for cart? Not sure how to map the hierarchy of this **

### API routes
* GET api/stock : returns all inventory objects
* GET api/stock/:id : returns item by ID number (when clicking on image in shop)
** Do I need to create post/delete routes linked to a cart table? **

### To do
[] Create & populate shop database
[] Set up server
[] Create & test routes on Postman
[] Develop front end shop page & display all items & relevent properties
[] Prep & import assets

