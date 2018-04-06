// Export All Routes And Make Them Accessible In App
module.exports = function(app) {
    // Imports Task Controller With All Methods
    var task = require('../controllers/task.controller.js');

    // Create a new Task
    app.post('/task', task.create);

    // Retrieve all task
    //TODO remove this
    app.get('/task', task.findAll);
    app.get('/tasks', task.findAllTasks);
    
    // Retrieve a single Task with TaskId
    app.get('/tasks/:_id', task.findOne);

    // Update a Task with TaskId
    app.post('/updatetask', task.update);

    // Delete a Task with TaskId
    app.get('/deletetask/:_id', task.delete);

    // ADD A NEW TASK 
    app.get('/addtasks', task.addOne);
    app.post('/addtask', task.createATask);
    
};