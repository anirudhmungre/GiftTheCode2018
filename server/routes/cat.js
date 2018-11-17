"use strict"
const express = require('express')
const { resp } = require('../components/response')
let router = express.Router()

router.get('/', (req, res) => {
    return res.json(resp.make()
        .setResponseCode(200)
        .setMessage("Welcome to the cat API")
    )
})

router.get('/add', (req, res) => {
    return res.json(resp.make()

    )
})

router.get('/edit', (req, res) => {
    return res.json(resp.make()
        
    )
})

router.get('/all', (req, res) => {
    return res.json(resp.make()
        
    )
})

router.get('/local', (req, res) => {
    return res.json(resp.make()
        
    )
})

router.get('/pair', (req, res) => {
    return res.json(resp.make()
        
    )
})

router.get('/add', (req, res) => {
    return res.json(resp.make()
        
    )
})

module.exports = router