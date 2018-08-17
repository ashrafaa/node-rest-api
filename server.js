const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8000;

// process request body
app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err);
    }

    // add database name, not collection name
    dbase = database.db("sandm");
    require('./app/routes')(app, dbase);
    
    app.listen(port, () => {
        console.log('Running on port '+ port);
    });
});
