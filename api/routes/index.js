/*
 * Require
 */
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/carApp';
const Station = require('../models/station');



/*
 * Vars
 */


/**
 * Station routes
 */

// @Post : new station
router.post('/stations', (req, res, next) => {
    Station.create(req.body)
    .then(station => {
        res.send(station);
    })
    .catch(error => {
        res.send(error);
    });
/*     MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('stations').insertOne(req.body.name , (err, result) => {
            assert.equal(null, err);
            console.log('Station added to database');
            client.close();
        });
    }); */
});

// @Get : One specific station
router.get('/stations/:name', (req, res, next) => {
    let result= [];
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        const cursor = db.collection('stations').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            result.push(doc);
            }, () => {
            client.close();
            res.render('index', {items: result});
        });
    });
});

// @Put : One specific station
router.put('/stations/:name', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('stations').put(req.body.name, req.body.newName)
        .then((err, results) => {
            assert.equal(null, err);
            console.log('Station updated successfully');
            client.close();
        });
    });
});

// @Delete : One specific station
router.delete('/stations/:name', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('stations').delete(req.body.name, (err, results) => {
            assert.equal(null, err);
            console.log('Station deleted from database');
            client.close();
        });
    });
});


/**
 * Car Routes
 */

// @GET : All cars from all stations
router.get('/stations/cars', (req, res, next) => {
    let result = [];
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        const cursor = db.collection('cars').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            result.push(doc);
        }, () => {
            client.close();
            res.render('index', { items: result });
        });
    });
});

// @Post : new car without station
router.post('/stations/cars', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('cars').insertOne(req.body.name, (err, result) => {
            assert.equal(null, err);
            console.log('Car added to database');
            client.close();
        });
    });
});

// @Post : new car belonging to one specific station
router.post('/stations/:name/cars', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('cars').insertOne(req.body.name, (err, result) => {
            assert.equal(null, err);
            console.log('Car added to database');
            client.close();
        });
    });
});



// @Get : One car from all stations
router.get('/stations/cars/:id', (req, res, next) => {
    let result = [];
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        const cursor = db.collection('cars').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            result.push(doc);
        }, () => {
            client.close();
            res.render('index', { items: result });
        });
    });
});

// @Put: One specific car
router.put('/stations/cars/:id', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('cars').put(req.body.name, req.body.newName)
            .then((err, results) => {
                assert.equal(null, err);
                console.log('Car updated successfully');
                client.close();
            });
    });
});

// @Delete: One specific car
router.delete('/stations/cars/:id', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('cars').delete(req.body.name, (err, results) => {
            assert.equal(null, err);
            console.log('Car deleted from database');
            client.close();
        });
    });
});


module.exports = router;
