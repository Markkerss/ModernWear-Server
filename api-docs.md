# E-commerce CMS Server
This E-commerce CMS App is an application for an admin to control the contents of an e-commerce has. This app has : 
* RESTful endpoints for authentication, authorization and getting APIs
* JSON formatted response
* List of Errors and its Responses

&nbsp;

## RESTful endpoints
```
POST /login
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
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
"id": "<id>"
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
## 2. GET /products

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
401 - Authentication Error,
500 - Internal Server Error
}
```

---
## 3. POST /products

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
401 - Authentication Error,
500 - Internal Server Error
}
```

---
## 4. PUT /products/:id

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
401 - Authentication Error,
500 - Internal Server Error
}
```

---
## 5. DELETE /products/:id

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
401 - Authentication Error,
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

_Response (401 - Authentication Error)_
```
{
"message": "Please log in"
}
```

_Response (500 - Internal Server Error)_
```
{
"message": "Internal server error"
}
```