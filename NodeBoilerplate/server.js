const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const methodOverride = require('method-override');
const multerGridfsStorage = require('multer-gridfs-storage');
const gridfsStream = require('gridfs-stream');
const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// MongoClient
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test')
// conn.once('open',()=>{
//
// });

// Server view
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
// view goes to node_routes

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) {
    return console.log(err);
  }
  let newdb = client.db('test');
  // freeCodeCamp router
  require('./app/routes')(app, newdb);

  // client.close();



  // base router
  // newdb.collection('temp').findOne({}, function (findErr, result) {
  //   if (findErr) throw findErr;
  //   console.log(result._id);
  //   client.close();
  // });

  app.listen(port, () => {
    console.log("Server working on port" + " : " + port);
  });
});
