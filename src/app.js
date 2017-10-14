import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import users from './routes/users';
import routes from './routes';
import mongoose from 'mongoose';
import pledge from './routes/pledge';
import getUsers from './routes/getUsers';
import {addToBucket, pourBucket, filterBucket} from './routes/bucketActions';
import {addMotionToVote, getMotions, voteForMotion} from './routes/motions';

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

//Mongo
mongoose.connect('mongodb://localhost:27017/hat');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Routes
app.use('/', routes);
app.use('/users',users);
app.use('/pledge',pledge);
app.use('/getusers',getUsers);
app.get('/bucket', pourBucket);
app.post('/bucket', addToBucket);
app.post('/filterBucket',filterBucket);
app.get('/motions', getMotions);
app.post('/motions',addMotionToVote);
app.post('/vote',voteForMotion);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
