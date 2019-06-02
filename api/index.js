const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb://localhost:27017/carApp';
const port = 4000;



mongoose.connect(url,  { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(' Connected to mongodb database');
});


app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(' Listening on port 4000');
});