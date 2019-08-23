const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouters = require('./api/routes/user');
const studentRouters = require('./api/routes/student');
const taskRouters = require('./api/routes/task');

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routers
app.use('/user',userRouters);
app.use('/student',studentRouters);
app.use('/task',taskRouters);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:error.message
    })
})

module.exports = app;