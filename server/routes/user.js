"use strict"
const express = require('express')
const { resp } = require('../components/response')
const { OurSQL } = require('../components/oursql')
let router = express.Router()
let sql = new OurSQL()

router.get('/', (req,res) => {
    return res.json(resp.make()
        .setResponseCode(200)
        .setMessage("Welcome to the User API")
    )
})

router.get('/new', (req, res) => {
    let post = {
        id: req.body.hashId,
        sName: req.body.name,
        addr: req.body.addr,
        email: req.body.email,
        phone: req.body.phone,
        empType: req.body.type,
        locId: req.body.locId
    }
    sql.query('INSERT INTO User SET ?', post,
    (results, fields) => {
        sql.quitConnection()
        return res.json(resp.make()
            .setMessage("Query successful!")
            .setResponseCode(200)
            )
    }, (error) => {
        if (error){
            return res.json(resp.make()
                .setError(error)
                .setResponseCode(500)
                .setMessage("There was an error :(")
                )
        }
    })
})

router.get('/edit', (req, res) => {
    let post = {
        id: req.body.hashId,
        sName: req.body.name,
        addr: req.body.addr,
        email: req.body.email,
        phone: req.body.phone,
        empType: req.body.type,
        locId: req.body.locId       
    }
    sql.query('UPDATE User SET id=?, sName=?, addr=?, email=?, phone=?, empType=?, locId=? WHERE id=?;', post,
    (results, fields) => {
        sql.quitConnection()
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

router.get('/auth', (req, res) => {
    let post = {
        username: req.body.username,
        passwd: req.body.hashPwd    
    }
    sql.query('SELECT passwd FROM User WHERE username=req.body.username;', post,
    (results, fields) => {
        sql.quitConnection()
        if (results.passwd == req.body.hashPwd) {
            return res.json(resp.make()
                .setMessage("Query sucessful!")
                .setResponseCode(200)
                .setData({auth: true})
            )
        } else {
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
                .setData({auth: false})
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
    let post = {
        id: req.body.hashId,
        sName: req.body.name,
        addr: req.body.addr,
        email: req.body.email,
        phone: req.body.phone,
        empType: req.body.type,
        locId: req.body.locId     
    }
    sql.query('SELECT * FROM User;', post,
    (results, fields) => {
        sql.quitConnection()
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