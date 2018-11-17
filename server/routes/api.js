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

router.get('/adoptableCats', (req, res) => {
    sql.establishConnection()
    fs.readFile('./src/Query/adoptableCats.sql', 'utf-8', (err, sQuery) => {
        // console.error(err)
        sql.query(sQuery, 
            (result, fields) =>{
                return res.json(resp.make()
                    .setMessage("Query Successful!")
                    .setReponseCode(200)
                    .setData(result)
                )
            }, (err, result) => {
            if (err){
                return res.json(resp.make()
                    .setError(err)
                    .setResponseCode(500)
                    .setMessage("There was an error :(")
                )
            }
            sql.quitConnection()
        })
    })
})


module.exports = router