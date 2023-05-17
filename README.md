# e-commerceAPI
---
## Contributors
- Rafael Canedo
- Garren Diab
- Jeremy Troff

## API Info
### What will the API do?
Provide access to users to see available products, see/add orders, and see/add reviews. We will also have admin users that will be able to edit all three areas.

### How will your API utilize a login system?
Basic users will have access to see products, orders, and reviews as well as add to the last two. Admin users will be able to see and edit all three areas.

### What database will you use?
MongoDb

### How will the data be stored in your database?
In documents within four different collections (Users, Products, Orders, Reviews)

### How would a frontend be able to manage authentication state based on the data you provide?
Be able to login using basic credentials or admin credentials will determine what calls to the API you can make.

### What pieces of data in your app will need to be secured? How will you demonstrate web security principles in the development of this app?
User information and login credentials will need to be secured. We will hash passwords, use environment variables, and restrict access to the users collection to only admins.

### What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
Folders for each different aspect (Ex. Controllers and Routes would get their own folder). As for why, it is because that is the way we were taught to do it in this class.

### What are potential stretch challenges that you could implement to go above and beyond?
Extra credit to implement using TypeScript. Implement a workable frontend more than a basic login URL.

## API Endpoints
### Products
-	GET /products
-	GET /products/{productId}
-	GET /products/{type}
-	POST /products
-	PUT /products/{productid}
-	DELETE /products/{productId}
### Orders
- GET /orders
- GET /orders/{orderId}
- POST /orders
- PUT /orders/{orderId}
- DELETE /orders/{orderId}
### Reviews
- GET /reviews
- GET /reviews/{productId}
- GET /reviews/{reviewId}
- GET /reviews/{rating}
- POST /reviews
- PUT /reviews/{reviewId}
- DELETE /reviews/{reviewId}
### User
- GET /user/login
- GET /user/logout
- GET /user
- GET /user/{username}
- POST /user
- PUT /user/{username}
- DELETE /user/{username}
