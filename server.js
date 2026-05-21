const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes'));
app.use((err, req, res, next) => {
    console.log(err);

    const status = err.status || 500;
    const message = err.message || 'Server error';

    res.status(status).json({
        error: message,
        status: status
    });
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
        console.log(`Database is listening and app is running on port ${port}`)
        });
    }
});

