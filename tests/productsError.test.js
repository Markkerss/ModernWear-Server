const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app.js')
const {User} = require('../models')

let access_token_value = null
// let id_create = null

beforeAll(function(done){
    User.findOne({where: {role: "admin"}})
        .then(data => {
            access_token_value = jwt.sign({id: data.id, email: data.email}, process.env.SECRET)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})

// beforeAll(function(done){
//     request(app)
//         .post("/products")
//         .send({
//             email: 'correct@mail.com',
//             password: '123456'
//         })
//         .end(function(err,res){
//             if(err) {
//                 done(err)
//             } else {
//                 console.log("res.body.id>>>>", res.body)
//                 id_create = res.body.id
//                 done()
//             }
//         })
// })

describe("ERROR POST /products", function(){
    //Product Name Empty
    it("POST /products - 400 ERROR (Name empty)", function(done) {
        const body = {
            name: "",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }

        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Name is required"}, {"message": "Name must be a string"})

                    done()
                }
            })
    })

    //Product Image_url Empty
    it("POST /products - 400 ERROR (image_url empty)", function(done) {
        const body = {
            name: "AdidasNMD",
            image_url:"",
            price: 1000000,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Image_url is required"}, {"message": "Image_url must be a string"})

                    done()
                }
            })
    })

    //POST Product Price Null
    it("POST /products - 400 ERROR (price null)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blabala.com",
            price: 0,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //POST Product Stock Null
    it("POST /products - 400 ERROR (stock null)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 0
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //POST products price below 0
    it("POST /products - 400 ERROR (price below 0)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: -100000,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //POST stock below 0
    it("POST /products - 400 ERROR (stock below 0)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 100000,
            stock: -100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //POST products price not number
    it("POST /products - 400 ERROR (price not a number)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: "hahaha",
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be a number"})

                    done()
                }
            })
    })

    //POST products stock not integer
    it("POST /products - 400 ERROR (stock not a integer)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 100000,
            stock: "hahahaha"
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be an integer"})

                    done()
                }
            })
    })
})

describe("ERROR PUT /products/4", function(){
    //Product Name Empty
    it("PUT /products/4 - 400 ERROR (Name empty)", function(done) {
        const body = {
            name: "",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }

        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Name is required"}, {"message": "Name must be a string"})

                    done()
                }
            })
    })

    //Product Image_url Empty
    it("PUT /products/4 - 400 ERROR (image_url empty)", function(done) {
        const body = {
            name: "AdidasNMD",
            image_url:"",
            price: 1000000,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Image_url is required"}, {"message": "Image_url must be a string"})

                    done()
                }
            })
    })

    //PUT Product Price Null
    it("PUT /products/4 - 400 ERROR (price null)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blabala.com",
            price: 0,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //PUT Product Stock Null
    it("PUT /products/4 - 400 ERROR (stock null)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 0
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put(`/products/4`)
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //PUT products price below 0
    it("PUT /products/4 - 400 ERROR (price below 0)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: -100000,
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put(`/products/4`)
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //PUT stock below 0
    it("PUT /products/4 - 400 ERROR (stock below 0)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 100000,
            stock: -100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be greater than or equal to 1"})

                    done()
                }
            })
    })

    //PUT products price not number
    it("PUT /products/4 - 400 ERROR (price not a number)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: "hahaha",
            stock: 100
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Price must be a number"})

                    done()
                }
            })
    })

   // PUT products stock not integer
     it("PUT /products/4 - 400 ERROR (stock not a integer)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 100000,
            stock: "hahahaha"
        }
        
        const headers = {
            access_token: access_token_value
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toEqual({"message": "Stock must be an integer"})

                    done()
                }
            })
    })
})
