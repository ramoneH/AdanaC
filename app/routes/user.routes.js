// Export All Routes And Make Them Accessible In App
module.exports = function(app) {
    // Imports Task Controller With All Methods
    var user = require('../controllers/user.controller.js');

    // Create a new Task
    app.post('/task', user.create);

    // Retrieve all task
    //TODO remove this
    app.get('/task', user.findAll);
    app.get('/tasks', user.findAllUsers); 
    
    // Retrieve a single Task with TaskId
    app.get('/tasks/:_id', user.findOne);

    // Update a Task with TaskId
    app.post('/updatetask/:_id', user.update);

    // Delete a Task with TaskId
    app.get('/deletetask/:_id', user.delete);

    // ADD A NEW TASK 
    app.get('/addtasks', user.addOne);
    app.post('/addtask', user.createAUser);
    
};