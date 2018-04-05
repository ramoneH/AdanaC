module.exports = function(app) {

    var task = require('../controllers/task.controller.js');
    var dbConfig = require('../../config/database.config.js');
    var Task = require('../models/task.model.js');

    // app.param('_id', function(req, res, next, _id) {
    //     // typically we might sanity check that user_id is of the right format
    //     Task.findOne(_id, function(err, task) {
    //       if (err) return next(err);
    //       if (!task) return next(404);
    //       console.log(task);
    //       console.log(Task);
      
    //       req.params._id = _id;
    //       next();
    //     });
    //   });

    // Create a new Task
    app.post('/task', task.create);

    // Retrieve all task
    app.get('/task', task.findAll);

    // Retrieve a single Task with TaskId
    app.delete('/task/:_id', task.delete);

    app.get('/tasks/:_id', task.findOne);

    // Update a Task with TaskId
    app.put('/task/:_id', task.update);

    // Delete a Task with TaskId
    app.get('/deletetask/:_id', task.delete);

    app.get('/tasks', task.findAllTasks);

    app.get('/addtasks', task.addOne);
    // ADD A NEW TASK 
    app.post('/addtask', task.createATask);
    
};