const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// Db connection
const { mongoose } = require('./database');

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/employees', require('./routes/emp.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});