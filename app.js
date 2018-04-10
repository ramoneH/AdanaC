var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var routes = require('./routes/index');

var app = express();

// parse requests of content-type - application/json 
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Make our Routes Accessible to our app
//app.use('/', routes);
// create express app

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
var db = dbConfig.url;

mongoose.Promise = global.Promise;

mongoose.connect(db);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});
// define a simple route
app.get('/', function(req, res){
  res.render('index', { title: 'Task Tracker App' });
});

// Require Task routes
require('./app/routes/task.routes.js')(app);

// listen for requests
app.listen(3001, function(){
  console.log("Server is listening on port 3001");
});
module.exports = app;