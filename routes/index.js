var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Tracker App' });
});

/* Get Tasks Page */
// router.get('/tasks', function(req, res) {
//   res.render('tasks', { title: 'Tasks!' });
// });

// GET Tasks page. //
router.get('/tasks', function(req, res) {
    var db = req.db;
    var collection = db.get('taskcollection');
    collection.find({},{},function(e,docs){
        res.render('tasks', {
            "tasks" : docs
        });
    });
});

// GET Add Tasks page. //
router.get('/addtasks', function(req, res) {
    res.render('addtasks', { title: 'Add New Tasks' });
});

// POST to Add Task Service /
router.post('/addtask', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var task = req.body.taskname;
    var desc = req.body.taskdesc;

    // Set our collection
    var collection = db.get('taskcollection');

    // Submit to the DB
    collection.insert({
        "task" : task,
        "desc" : desc
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("tasks");
        }
    });
});
module.exports = router;
