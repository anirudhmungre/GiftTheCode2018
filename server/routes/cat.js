"use strict"
const express = require('express')
const { resp } = require('../components/response')
const { OurSQL } = require('../components/oursql')
let router = express.Router()
let sql = new OurSQL()

router.get('/', (req, res) => {
    return res.json(resp.make()
        .setResponseCode(200)
        .setMessage("Welcome to the cat API")
    )
})

router.get('/add', (req, res) => {
    let post = {
        id: req.body.hashId,
        cName: req.body.name,
        dob: req.body.dob,
        sex: req.body.sex,
        breed: req.body.breed,
        behavior: req.body.behavior,
        stat: req.body.stat,
        locId: req.body.locId,
        adopterId: null 
    }
    sql.query('INSERT INTO Cat SET ?;', post, 
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
        id: req.body.id,
        cName: req.body.name,
        dob: req.body.dob,
        sex: req.body.sex,
        breed: req.body.breed,
        behavior: req.body.behavior,
        stat: req.body.stat,
        locId: req.body.locId,
        adopterId: req.body.adopterId 
    }
    sql.query('UPDATE Cat SET cName=?, dob=?, sex=?, breed=?, behavior=?, stat=?, locId=?, adopterId=? WHERE id=?;', post, 
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

router.get('/all', (req, res) => {
    sql.query('SELECT * FROM Cat;', 
    (results, fields) => {
        sql.quitConnection()
        return res.json(resp.make()
            .setMessage("Query successful!")
            .setResponseCode(200)
            .setdata(results)
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

router.get('/local', (req, res) => {
    sql.query('SELECT * FROM Cat WHERE locId=?;', [req.body.locId],
    (results, fields) => {
        sql.quitConnection()
        return res.json(resp.make()
            .setMessage("Query successful!")
            .setResponseCode(200)
            .setdata(results)
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

router.get('/pair', (req, res) => {
    sql.query('SELECT * FROM Cat WHERE pair NOT NULL;',
    (results, fields) => {
        sql.quitConnection()
        return res.json(resp.make()
            .setMessage("Query successful!")
            .setResponseCode(200)
            .setdata(results)
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

module.exports = router