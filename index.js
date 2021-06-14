const express = require('express');
const path = require('path');
require('dotenv').config();

const { dbConnection } = require('./database/config');
dbConnection();

const app = express()

app.use(express.json());



const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


app.use('/api/login', require('./routes/auht'));

app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Server run on port', process.env.PORT);
});