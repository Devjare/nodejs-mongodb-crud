const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// TODO: investigate more view engines
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
});

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);

// database connection
mongoose.connect('mongodb://mongo:27017/crud-mongo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('Database connected')).
catch(err => console.log('Error trying to connect to DB, [Error]= ', err));