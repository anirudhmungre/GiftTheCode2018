"use strict"
const express = require('express')
const { resp } = require('../components/response')
const { OurSQL } = require('../components/oursql')
let router = express.Router()
let sql = new OurSQL()
let con = sql.getConnection()

router.get('/', (req, res) => {
    return res.json(resp.make()
        .setResponseCode(200)
        .setMessage("Welcome to the User API")
    )
})

router.post('/new', (req, res) => {
    let post = {
        id: req.body.hashId,
        sName: req.body.name,
        addr: req.body.addr,
        email: req.body.email,
        phone: req.body.phone,
        empType: req.body.type,
        username: req.body.username,
        hashPass: req.body.hashPass,
        locId: req.body.locId
    }
    sql.query('INSERT INTO User (id, sName, addr, email, phone, empType, username, passwd, locId) VALUES (' 
        + Object.values(post).map(x => con.escape(x)) + ')',
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
            )
        }, (error) => {
            if (error) {
                return res.json(resp.make()
                    .setError(error)
                    .setResponseCode(500)
                    .setMessage("There was an error :(")
                )
            }
        })
})

router.post('/edit', (req, res) => {
    let post = {
        id: req.body.id,
        sName: req.body.name,
        addr: req.body.addr,
        email: req.body.email,
        phone: req.body.phone,
        empType: req.body.type,
        locId: req.body.locId
    }
    sql.query('UPDATE User SET sName=' + con.escape(post.sName) + ', addr=' + con.escape(post.addr) 
        + ', email=' + con.escape(post.email) + ', phone=' + con.escape(post.phone) + ', empType=' + con.escape(post.empType) 
        + ', locId=' + con.escape(post.locId) + ' WHERE id=' + con.escape(post.id),
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query sucessful!")
                .setResponseCode(200)
            )
        }, (error) => {
            if (error) {
                return res.json(resp.make()
                    .setError(error)
                    .setResponseCode(500)
                    .setMessage("There was an error :(")
                )
            }
        })
})

router.post('/auth', (req, res) => {
    let post = {
        username: req.body.username,
        password: req.body.password
    }
    sql.query('SELECT passwd FROM User WHERE username = ' + sql.getConnection().escape(post.username),
        (results, fields) => {
            // sql.quitConnection()
            if (results.passwd == post.password) {
                return res.json(resp.make()
                    .setMessage("Login sucessful!")
                    .setResponseCode(200)
                    .setData({ auth: true })
                )
            } else {
                return res.json(resp.make()
                    .setMessage("Invalid login details")
                    .setResponseCode(200)
                    .setData({ auth: false })
                )
            }
        }, (error) => {
            if (error) {
                return res.json(resp.make()
                    .setError(error)
                    .setResponseCode(500)
                    .setMessage("There was an error :(")
                )
            }
        })
})

router.get('/all', (req, res) => {
    sql.query('SELECT * FROM User',
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query sucessful!")
                .setResponseCode(200)
            )
        }, (error) => {
            if (error) {
                return res.json(resp.make()
                    .setError(error)
                    .setResponseCode(500)
                    .setMessage("There was an error :(")
                )
            }
        })
})

module.exports = router