var Task = require('../models/task.model.js');

exports.addOne = function(req, res) {
    res.render('addtasks');
};
exports.taskparam = function(req, res) {
    res.send(req.params._id);
};
exports.create = function(req, res) {
    // Create and Save a new Task
    if(!req.body.taskname) {
        return res.status(400).send({message: "Task can not be empty"});
    }

    var task = new Task({
        task: req.body.taskname,
        ass: req.body.taskass,
        desc: req.body.taskdesc,
        comp: req.body.taskcomp
    });

    task.save(function(err, task) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Task."});
        } else {
            
            res.send(task);
            res.render('tasks');
        }
    });
};

exports.createATask = function(req, res) {
    // Create and Save a new Task
    if(!req.body.taskname) {
        return res.status(400).send({message: "Task can not be empty"});
    }

    var task = new Task({
        task: req.body.taskname,
        ass: req.body.taskass,
        desc: req.body.taskdesc,
        comp: req.body.taskcomp
    });

    task.save(function(err, task) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Task."});
        } else {
            Task.find(function(err, tasks){
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while retrieving Tasks."});
                } else {
                    //res.send(tasks);
                    res.render('tasks', {
                        "tasks" : tasks
                    });
                }
            });
        }
    });
};
exports.findAllTasks = function(req, res) {
    // Retrieve and return all tasks from the database.
    Task.find(function(err, tasks){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving Tasks."});
        } else {
            //res.send(tasks);
            res.render('tasks', {
                "tasks" : tasks
            });
        }
    });
};
exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Task.find(function(err, tasks){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(tasks);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single task with a taskID
    Task.findById(req.params._id, function(err, task) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Task not found with id " + req.params._id});                
            }
            return res.status(500).send({message: "Error retrieving task with id " + req.params._id});
        } 

        if(!task) {
            return res.status(404).send({message: "Task not found with id " + req.params._id});            
        }

        res.json([task]);
    });
};

exports.update = function(req, res) {
    // Update a task identified by the taskID in the request
    Task.findById(req.params.taskId, function(err, task) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Task not found with id " + req.params.taskId});                
            }
            return res.status(500).send({message: "Error finding task with id " + req.params.taskID});
        }

        if(!task) {
            return res.status(404).send({message: "Task not found with id " + req.params.taskID});            
        }

        task.taskname = req.body.taskname;
        ass.taskass = req.body.taskass;
        desc.taskdesc = req.body.taskdesc;
        comp.taskcomp = req.body.taskcomp;

        task.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update task with id " + req.params.taskID});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a task with the specified taskID in the request
    Task.findByIdAndRemove(req.params._id, function(err, task) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Task not found with id " + req.params._id});                
            }
            return res.status(500).send({message: "Could not delete task with id " + req.params._id});
        }

        if(!task) {
            return res.status(404).send({message: "Task not found with id " + req.params._id});
        }

        res.send({message: "Task deleted successfully!"});
    });
};