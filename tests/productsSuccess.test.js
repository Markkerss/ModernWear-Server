const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const {User} = require('../models')

let access_tokens = null

beforeAll(function(done){
    User.findOne({where: {role: "admin"}})
        .then(data => {
            access_tokens = jwt.sign({id: data.id, email: data.email}, process.env.SECRET)
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})

describe("SUCCESS /products", function(){

    //CREATE Product
    it("POST /products - 201 OK", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }

        const headers = {
            access_token: access_tokens
        }
        request(app)
            .post("/products")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(201)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("id")
                    expect(typeof res.body.id).toEqual("number")
                    expect(res.body).toHaveProperty("name", body.name)
                    expect(typeof res.body.name).toEqual("string")
                    expect(res.body).toHaveProperty("image_url", body.image_url)
                    expect(typeof res.body.image_url).toEqual("string")
                    expect(res.body).toHaveProperty("price", body.price)
                    expect(typeof res.body.price).toEqual("number")
                    expect(res.body).toHaveProperty("stock", body.stock)
                    expect(typeof res.body.stock).toEqual("number")
                    expect(res.body).toHaveProperty("createdAt")
                    expect(typeof res.body.createdAt).toEqual("string")
                    expect(res.body).toHaveProperty("updatedAt")
                    expect(typeof res.body.updatedAt).toEqual("string")

                    done()
                }
            })
    })

    //READ Product
    it("GET /products - 200 OK", function(done) { 
        const headers = {
            access_token: access_tokens
        }
        request(app)
            .get("/products")
            .set(headers)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(Array.isArray(res.body)).toEqual(true)
                    expect(typeof res.body[0]).toEqual("object")
                    expect(res.body[0]).toHaveProperty("id")
                    expect(typeof res.body[0].id).toEqual("number")
                    expect(res.body[0]).toHaveProperty("name")
                    expect(typeof res.body[0].name).toEqual("string")
                    expect(res.body[0]).toHaveProperty("image_url")
                    expect(typeof res.body[0].image_url).toEqual("string")
                    expect(res.body[0]).toHaveProperty("price")
                    expect(typeof res.body[0].price).toEqual("number")
                    expect(res.body[0]).toHaveProperty("stock")
                    expect(typeof res.body[0].stock).toEqual("number")
                    
                    done()
                }
            })
    })

    //PUT products
    it("PUT /products/4 - 200 OK", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }
        const headers = {
            access_token: access_tokens
        }
        request(app)
            .put("/products/4")
            .set(headers)
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("name", body.name)
                    expect(typeof res.body.name).toEqual("string")
                    expect(res.body).toHaveProperty("image_url", body.image_url)
                    expect(typeof res.body.image_url).toEqual("string")
                    expect(res.body).toHaveProperty("price", body.price)
                    expect(typeof res.body.price).toEqual("number")
                    expect(res.body).toHaveProperty("stock", body.stock)
                    expect(typeof res.body.stock).toEqual("number")

                    done()
                }
            })
    })

    //DELETE products
    it("DELETE /products/4 - 200 OK", function(done) {
        const headers = {
            access_token: access_tokens
        }
        request(app)
            .delete("/products/4")
            .set(headers)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Product has been successfully deleted.")

                    done()
                }
            })
    })
})

