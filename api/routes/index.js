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
        db.collection('station').put(req.body.name, req.body.newName)
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
        db.collection('station').delete(req.body.name, (err, results) => {
            assert.equal(null, err);
            console.log('Station deleted from database');
            db.close();
        });
    });
});


app.post('/cars', (req, res, next) => {

});

app.get('/cars', (req, res, next) => {
    
});

app.put('/cars', (req, res, next) => {

});

app.delete('/cars', (req, res, next) => {

});



