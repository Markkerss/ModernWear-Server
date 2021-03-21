const request = require('supertest')
const app = require('../app')

describe("SUCCESS /users", function(){
    //POST login
    it("POST /login - 200 OK", function(done) {
        const body = {
            email: "correct@mail.com",
            password: "123456"
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    console.log(res.body)
                    expect(res.statusCode).toEqual(200)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("id")
                    expect(typeof res.body.id).toEqual("number")
                    expect(res.body).toHaveProperty("email")
                    expect(typeof res.body.email).toEqual("string")
                    expect(res.body).toHaveProperty("access_token")
                    expect(typeof res.body.access_token).toEqual("string")
                    
                    done()
                }
            })
    })

    it("POST /login - 400 ERROR (Password is incorrect)", function(done) {
        const body = {
            email: "correct@mail.com",
            password: "incorrectPass"
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Invalid email/password")

                    done()
                }
            })
    })

    it("POST /login - 400 ERROR (Email is not found)", function(done) {
        const body = {
            email: "incorrectEmail@mail.com",
            password: "123455"
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Invalid email/password")

                    done()
                }
            })
    })

    it("POST /login - 400 ERROR (Email is empty)", function(done) {
        const body = {
            email: "",
            password: "123456"
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Invalid email/password")

                    done()
                }
            })
    })

    it("POST /login - 400 ERROR (Password is empty)", function(done) {
        const body = {
            email: "mail@mail.com",
            password: ""
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Invalid email/password")

                    done()
                }
            })
    })

    it("POST /login - 400 ERROR (Email and Password are empty)", function(done) {
        const body = {
            email: "",
            password: ""
        }
        request(app)
            .post("/login")
            .send(body)
            .end(function(err,res){
                if(err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual("object")
                    expect(res.body).toHaveProperty("message")
                    expect(res.body.message).toEqual("Invalid email/password")

                    done()
                }
            })
    })
})