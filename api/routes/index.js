/*
 * Require
 */
const express = require('express');
const app = express();
const mongo = require('mongodb');
const assert= require('assert');

const url = 'mongodb://localhost:27017/test';


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

app.post('/stations', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('stations').insertOne(req.body.name, (err, result) => {
            assert.equal(null, err);
            console.log('Station added to database');
            db.close();
        });
    });
});


app.get('/stations', (req, res, next) => {
    let result= [];
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        const cursor = db.collection('stations').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            result.push(doc);
            }, () => {
            db.close();
            res.render('index', {items: result});
        });
    });
});

app.put('/stations', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('stations').put(req.body.name, req.body.newName)
        .then((err, results) => {
            assert.equal(null, err);
            console.log('Station updated successfully');
            db.close();
        });
    });
});

app.delete('/stations', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('stations').delete(req.body.name, (err, results) => {
            assert.equal(null, err);
            console.log('Station deleted from database');
            db.close();
        });
    });
});


app.post('/car/::id', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('cars').insertOne(req.body.name, (err, result) => {
            assert.equal(null, err);
            console.log('Car added to database');
            db.close();
        });
    });
});


app.get('/car/::id', (req, res, next) => {
    let result = [];
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        const cursor = db.collection('cars').find();
        cursor.forEach((doc, err) => {
            assert.equal(null, err);
            result.push(doc);
        }, () => {
            db.close();
            res.render('index', { items: result });
        });
    });
});

app.put('/car/::id', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('cars').put(req.body.name, req.body.newName)
            .then((err, results) => {
                assert.equal(null, err);
                console.log('Car updated successfully');
                db.close();
            });
    });
});

app.delete('/car/::id', (req, res, next) => {
    mongo.connect(url, (err, db) => {
        assert.equal(null, err);
        db.collection('cars').delete(req.body.name, (err, results) => {
            assert.equal(null, err);
            console.log('Car deleted from database');
            db.close();
        });
    });
});



