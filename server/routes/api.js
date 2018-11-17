"use strict"
const express = require('express')
const { OurSQL } = require('../components/oursql')
const { resp } = require('../components/response')
const fs = require('fs')
let router = express.Router()
let sql = new OurSQL()
router.get('/', (req, res) => {
    return res.json(resp.make()
        .setError(null)
        .setResponseCode(200)
        .setMessage("Welcome to the homepage of the api!")
        .setData(null)
    )
})

router.get('/test', (req, res) => {
    return res.json(resp.make()
        .setError(null)
        .setResponseCode(200)
        .setMessage("You\'ve found the test page!")
        .setData({
            "KEY": "VALUE"
        })
    )
})

router.get('/viewCats', (req, res) => {
    let sQuery, result
    sQuery = fs.readFile('../src/Query/adoptableCats.sql', 'utf-8')
    sql.establishConnection()
    result = sql.query(sQuery, function(){
        sql.quitConnection()
    })
})


module.exports = router