# E-commerce CMS and Customer Server
This E-commerce CMS App is an application for an admin to control the contents of an e-commerce store. 
This E-Commerce Customer App is an application where customers can buy products from previously stated e-commerce store and put said products into a designated cart.
These apps have : 
* RESTful endpoints for authentication, authorization and getting APIs
* JSON formatted response
* List of Errors and its Responses

&nbsp;

## RESTful endpoints
```
POST /login
POST /register
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
GET /carts
GET /carts/total
POST /carts/:productId
PUT /carts/:id
DELETE /carts/:id
```

---
## 1. POST /login

> Log into an existing user's account

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>",
    "password": "<your password>",
}
```

_Response (200)_
```
{
    "access_token": "<access_token>",
    "email": "<email>",
    "id": "<id>",
    "role": "<role>"
}
```

_Errors_
```
{
    400 - Login Authentication Error,
    500 - Internal Server Error
}
```

---
## 2. POST /register

> Create a new account for a user

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>",
    "password": "<your password>",
}
```

_Response (200)_
```
{
    "access_token": "<access_token>",
    "email": "<email>",
    "id": "<id>",
    "role": "<role>"
}
```

_Errors_
```
{
    400 - Login Authentication Error,
    500 - Internal Server Error
}
```

---
## 3. GET /products

> Get all products.

_Request Header_
```
{
    "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
{
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
},
{
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
},
{
    "id": "<id>",
    "name": "<name>",
    "image_url": "<image_url>",
    "price": "<price>",
    "stock": "<stock>"
},
...
]
```

_Errors_
```
{
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 4. POST /products

> Add a new product

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
{
"name": "<name>",
"image_url": "<image_url>",
"price": "<price>",
"stock": "<stock>",
}
```

_Response (201)_
```
{
"id": "<id>",
"name": "<name>",
"image_url": "<image_url>",
"price": "<price>",
"stock": "<stock>",
"updatedAt": "<updatedAt>",
"createdAt": "<createdAt>",
}
```

_Errors_
```
{
400 - Validation Error(s),
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 5. PUT /products/:id

> Edit an existing product's information

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
{
"name": "<name>",
"image_url": "<image_url>",
"price": "<price>",
"stock": "<stock>",
}
```

_Response (200)_
```
{
"name": "<name>",
"image_url": "<image_url>",
"price": "<price>",
"stock": "<stock>",
}
```

_Errors_
```
{
400 - Validation Error(s),
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 6. DELETE /products/:id

> Delete an existing product

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
"message": "Product has been successfully deleted."
}
```

_Errors_
```
{
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 7. GET /carts

> Getting a certain customer's cart

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": "<id>",
            "quantity": "<quantity>",
            "UserId": "<UserId>",
            "ProductId": "<ProductId>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>",
            "Product": {
                "id": "<id>",
                "name": "<name>",
                "image_url": "<image_url>",
                "price": "<price>",
                "stock": "<stock>",
                "createdAt": "<createdAt>",
                "updatedAt": "<updatedAt>"
            }
        },
        {
            "id": "<id>",
            "quantity": "<quantity>",
            "UserId": "<UserId>",
            "ProductId": "<ProductId>",
            "createdAt": "<createdAt>",
            "updatedAt": "<updatedAt>",
            "Product": {
                "id": "<id>",
                "name": "<name>",
                "image_url": "<image_url>",
                "price": "<price>",
                "stock": "<stock>",
                "createdAt": "<createdAt>",
                "updatedAt": "<updatedAt>"
            }
        }
        ...
    ]
}
```

_Errors_
```
{
401 - Access Token Error,
500 - Internal Server Error
}
```

---
## 8. POST /carts/:productId

> Adding a product to a customer's cart

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
{
"quantity" = "<quantity>"
}
```

_Response (200)_
```
{
"message": "Successfully incremented quantity column"
}
```

_Response (201)_
```
{
"id": "<id>",
"UserId": "<UserId>",
"ProductId": "<ProductId>" 
}
```

_Errors_
```
{
400 - Quantity Greater than Stock Error,
401 - Access Token Error,
500 - Internal Server Error
}
```

---
## 9. DELETE /carts/:id

> Delete an existing product from a customer's cart

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
"message": "Successfully deleted cart"
}
```

_Errors_
```
{
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 10. PATCH /carts/:id

> Edit an existing cart item's quantity 

_Request Header_
```
{
"access_token" = "<access_token>"
}
```

_Request Body_
```
{
"quantity": "<quantity>",
}
```

_Response (200)_
```
{
"message": "Quantity in cart successfully updated"
}
```

_Errors_
```
{
400 - Quantity Greater than Stock Error,
401 - Access Token Error,
403 - Authorization Error,
500 - Internal Server Error
}
```

---
## 11. GET /carts/total

> Get the total price of all the customer's items in their cart

_Request Header_
```
{
"access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
"totalPrice": "<totalPrice>"    
}
```

_Errors_
```
{
401 - Access Token Error,
500 - Internal Server Error
}
```

&nbsp;

---
## Errors

_Response (400 - Login Authentication Error)_
```
{
"message": "Invalid email/password"
}
```

_Response (400 - Validation Error(s))_
```
{
"message": "<list of validation errors>"
}
```

_Response (400 - Quantity Greater than Stock Error)_
```
{
"message": "Quantity must not be more than stock"
}
```

_Response (401 - Access Token Error)_
```
{
"message": "Please log in"
}
```

_Response (403 - Authorization Error)_
```
{
"message": "Access Denied"
}
```

_Response (500 - Internal Server Error)_
```
{
"message": "Internal server error"
}
```