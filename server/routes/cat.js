"use strict"
const express = require('express')
const { resp } = require('../components/response')
const { OurSQL } = require('../components/oursql')
let router = express.Router()
let sql = new OurSQL()

const birth = (isoDate) => {
    date = new Date(isoDate)
    year = date.getFullYear()
    month = date.getMonth() + 1
    dt = date.getDate()
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
        id: req.body.hashId,
        cName: req.body.name,
        dob: birth(req.body.dob),
        sex: req.body.sex,
        breed: req.body.breed,
        behavior: req.body.behavior,
        stat: req.body.stat,
        locId: req.body.locId,
        adopterId: null
    }
    sql.query('INSERT INTO Cat SET ?', post,
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
    sql.query('UPDATE Cat SET cName=?, dob=?, sex=?, breed=?, behavior=?, stat=?, locId=?, adopterId=? WHERE id=?', post,
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
    sql.query('SELECT C.*, I.img FROM Cat AS C, Img AS I WHERE C.id=I.catId',
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

router.post('/gmayg', (req, res) => {
    let catId = {catId: req.body.catId}
    sql.query('SELECT * FROM Cat WHERE id=?', catId,
        (cResults, cFields) => {
            sql.query('SELECT L.id, L.addr, V.inDate, V.outDate FROM Cat AS C, Loc AS L, Visit AS V WHERE C.id=V.catId AND L.id=V.locId AND C.id=? ORDER BY L.inDate DESC', catId,
                (lResults, lFields) => {
                    sql.query('SELECT H.* FROM Cat AS C, Health AS H WHERE C.id=H.catId AND C.id=?', catId,
                        (hResults, hFields) => {
                            sql.query('SELECT I.img FROM Img AS I, Cat AS C WHERE C.id=I.catId AND C.id=?', catId,
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