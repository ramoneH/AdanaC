module.exports = function(app) {

    var task = require('../controllers/task.controller.js');
    var dbConfig = require('../../config/database.config.js');
    var Task = require('../models/task.model.js');


    // Create a new Task
    app.post('/task', task.create);

    // Retrieve all task
    app.get('/task', task.findAll);

    // Retrieve a single Task with TaskId
    app.get('/task/:_id', task.findOne);

    app.get('/tasks/:_id', task.findOne);

    // Update a Task with TaskId
    app.put('/task/:_id', task.update);

    // Delete a Task with TaskId
    app.delete('/deletetask/:_id', task.delete);

    app.get('/tasks', task.findAllTasks);

    app.get('/addtasks', task.addOne);
    
};