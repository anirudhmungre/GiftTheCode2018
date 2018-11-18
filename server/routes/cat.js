"use strict"
const express = require('express')
const { resp } = require('../components/response')
const { OurSQL } = require('../components/oursql')
let router = express.Router()
let sql = new OurSQL()

const birth = (isoDate) => {
    let date = new Date(isoDate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()
    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }
    return (year + '-' + month + '-' + dt)
}

router.get('/', (req, res) => {
    return res.json(resp.make()
        .setResponseCode(200)
        .setMessage("Welcome to the cat API")
    )
})

router.post('/add', (req, res) => {
    let post = {
        cName: req.body.cName,
        dob: birth(req.body.dob),
        sex: req.body.sex,
        age: req.body.age,
        breed: req.body.breed,
        behavior: req.body.behavior,
        pair: req.body.pair,
        stat: req.body.stat,
        locId: req.body.locId,
        adopterId: null
    }
    let con = sql.getConnection()
    sql.query('INSERT INTO Cat (cName, dob, sex, age, breed, behavior, pair, stat, locId, adopterId) VALUES (' 
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
        cName: req.body.name,
        dob: birth(req.body.dob),
        sex: req.body.sex,
        breed: req.body.breed,
        behavior: req.body.behavior,
        stat: req.body.stat,
        locId: req.body.locId,
        adopterId: req.body.adopterId
    }
    sql.query('UPDATE Cat SET cName=' + con.escape(post.cName) + ', dob=' + con.escape(post.dob) + ', sex=' + con.escape(post.sex) 
        + ', breed=' + con.escape(post.breed) + ', behavior=' + con.escape(post.behavior) + ', stat=' + con.escape(post.stat) 
        + ', locId=' + con.escape(post.locId) + ', adopterId=' + con.escape(post.adopterId) + ' WHERE id=' + con.escape(post.id),
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

router.get('/all', (req, res) => {
    sql.query('SELECT * FROM Cat',
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
                .setData(results)
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

router.post('/local', (req, res) => {
    sql.query('SELECT * FROM Cat WHERE locId=' + con.escape(req.body.locId),
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
                .setData(results)
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

router.get('/pair', (req, res) => {
    sql.query('SELECT * FROM Cat WHERE pair NOT NULL',
        (results, fields) => {
            // sql.quitConnection()
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
                .setData(results)
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

router.post('/pair/bond', (req, res) => {
    let post = {
        catId1: req.body.id1,
        catId2: req.body.id2
    }
    sql.query('UPDATE Cat SET pair = ' + con.escape(post.catId2) + ' WHERE id = ' + con.escape(post.catId1) + '; '
        + 'UPDATE Cat SET pair = ' + con.escape(post.catId1) + ' WHERE id = ' + con.escape(post.catId2), 
        (results, fields) => {
            return res.json(resp.make()
                .setMessage("Query successful!")
                .setResponseCode(200)
                .setData(results)
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

router.post('/gmayg', (req, res) => {
    let post = {catId: req.body.catId}
    sql.query('SELECT * FROM Cat WHERE id=' + con.escape(post.catId),
        (cResults, cFields) => {
            sql.query('SELECT L.id, L.addr, V.inDate, V.outDate FROM Cat AS C, Loc AS L, Visit AS V WHERE C.id=V.catId AND L.id=V.locId AND C.id=' + con.escape(post.catId) + ' ORDER BY L.inDate DESC',
                (lResults, lFields) => {
                    sql.query('SELECT H.* FROM Cat AS C, Health AS H WHERE C.id=H.catId AND C.id=' + con.escape(post.catId),
                        (hResults, hFields) => {
                            sql.query('SELECT I.img FROM Img AS I, Cat AS C WHERE C.id=I.catId AND C.id=' + con.escape(post.catId),
                                (iResults, iFields) => {
                                    return res.json(resp.make()
                                        .setMessage("Query successful!")
                                        .setResponseCode(200)
                                        .setData(cResults + lResults + hResults + iResults)
                                    )
                                },
                                (iError) => {
                                    if (error) {
                                        return res.json(resp.make()
                                            .setError(error)
                                            .setResponseCode(500)
                                            .setMessage("There was an error :(")
                                        )
                                    }
                                })
                        },
                        (hError) => {
                            if (error) {
                                return res.json(resp.make()
                                    .setError(error)
                                    .setResponseCode(500)
                                    .setMessage("There was an error :(")
                                )
                            }
                        })
                },
                (lError) => {
                    if (error) {
                        return res.json(resp.make()
                            .setError(error)
                            .setResponseCode(500)
                            .setMessage("There was an error :(")
                        )
                    }
                })
        },
        (cError) => {
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