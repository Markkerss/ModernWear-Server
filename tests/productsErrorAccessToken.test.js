const request = require('supertest')
const app = require('../app.js')

describe("ERROR /products (Access Token)", function(){
    it("POST /products - 401 ERROR (Incorrect Access Token)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }
        request(app)
            .post("/products")
            .set({access_token: "12345"})
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })

    it("POST /products - 401 ERROR (Nonexistent Access Token)", function(done) {
        const body = {
            name: "esfsefsefsfs",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }
        request(app)
            .post("/products")
            .set({access_token: ""})
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })

    it("PUT /products/4 - 401 ERROR (Incorrect Access Token)", function(done) {
        const body = {
            name: "Adidas NMD",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }
        request(app)
            .put("/products/4")
            .set({access_token: "12345"})
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })

    it("PUT /products/4 - 401 ERROR (Nonexistent Access Token)", function(done) {
        const body = {
            name: "esfsefsefsfs",
            image_url:"blablabla.com",
            price: 1000000,
            stock: 100
        }
        request(app)
            .put("/products/4")
            .set({access_token: ""})
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })

    it("DELETE /products/4 - 401 ERROR (Incorrect Access Token)", function(done) {
        request(app)
            .delete("/products/4")
            .set({access_token: "12345"})
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })

    it("DELETE /products/4 - 401 ERROR (Nonexistent Access Token)", function(done) {
        request(app)
            .delete("/products/4")
            .set({access_token: ""})
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(401)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Please log in")

                    done()
                }
            })
    })
})