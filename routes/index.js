var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Tracker App' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Task Tracker App' });
});
// /* Get Tasks Page */
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
    var comp = req.body.taskcomp;
    var ass = req.body.taskass;


    // Set our collection
    var collection = db.get('taskcollection');

    // Submit to the DB
    collection.insert({
        "task" : task,
        "desc" : desc,
        "comp" : comp,
        "ass" : ass
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
function addnew() {
  window.location.href = '/addtasks';
}
module.exports = router;
