/*
 * Require
 */
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const assert= require('assert');

const url = 'mongodb://localhost:27017/test';
const port = 4000;

app.listen(port, () => {
    console.log(' Listening on port 4000');
});

/*
 * Vars
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/**
 * Station routes
 */

// @Post : new station
app.post('/stations', (req, res, next) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        assert.equal(null, err);
        const db = client.db('test');
        db.collection('stations').insertOne(req.body.name, (err, result) => {
            assert.equal(null, err);
            console.log('Station added to database');
            client.close();
        });
    });
});

// @Get : One specific station
app.get('/stations/:name', (req, res, next) => {
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
app.put('/stations/:name', (req, res, next) => {
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
app.delete('/stations/:name', (req, res, next) => {
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
app.get('/stations/cars', (req, res, next) => {
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
app.post('/stations/cars', (req, res, next) => {
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
app.post('/stations/:name/cars', (req, res, next) => {
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
app.get('/stations/cars/:id', (req, res, next) => {
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
app.put('/stations/cars/:id', (req, res, next) => {
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
app.delete('/stations/cars/:id', (req, res, next) => {
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



