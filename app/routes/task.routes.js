module.exports = function(app) {

    var task = require('../controllers/task.controller.js');
    var dbConfig = require('../../config/database.config.js');
    var Task = require('../models/task.model.js');
    var taskId = Task;


    // Create a new Task
    app.post('/task', task.create);

    // Retrieve all task
    app.get('/task', task.findAll);

    // Retrieve a single Task with TaskId
    app.get('/task/:taskId', task.findOne);

    // Update a Task with TaskId
    app.put('/task/:taskId', task.update);

    // Delete a Task with TaskId
    app.delete('/task/:taskId', task.delete);

    app.get('/tasks', task.findAllTasks);
    
};