var User = require('../models/user.model.js');

exports.addOne = function(req, res) {
    res.render('addtasks');
};
exports.taskparam = function(req, res) {
    res.send(req.params._id);
};
exports.create = function(req, res) {
    // Create and Save a new Task
    if(!req.body.name) {
        return res.status(400).send({message: "User can not be empty"});
    }

    var user = new User({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        sport: req.body.sport,
        coach: req.body.coach,
        coach2: req.body.coach2,
        pname: req.body.pname,
        pname2: req.body.pname2,
        pnumb: req.body.pnumb
    });
    

    user.save(function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the User."});
        } else {
            
            res.send(user);
            res.render('tasks');
        }
    });
};

exports.createAUser = function(req, res) {
    // Create and Save a new Task
    if(!req.body.name) {
        return res.status(400).send({message: "User can not be empty"});
    }

    var user = new User({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        sport: req.body.sport,
        coach: req.body.coach,
        coach2: req.body.coach2,
        pname: req.body.pname,
        pname2: req.body.pname2,
        pnumb: req.body.pnumb
    });

    user.save(function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the USER."});
        } else {
            User.find(function(err, user){
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while retrieving Users."});
                } else {
                    //res.send(tasks);
                    res.render('tasks', {
                        "tasks" : user
                    });
                }
            });
        }
    });
};
exports.findAllUsers = function(req, res) {
    // Retrieve and return all tasks from the database.
    User.find(function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving Users."});
        } else {
            //res.send(tasks);
            res.render('tasks', {
                "tasks" : user
            });
        }
    });
};

//TODO remove this
exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    User.find(function(err, user){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving users."});
        } else {
            res.send(user);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single task with a taskID
    User.findById(req.params._id, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params._id});                
            }
            return res.status(500).send({message: "Error retrieving user with id " + req.params._id});
        } 

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params._id});            
        }
            // res.json([task]);
            res.render('update', {
                "thisTask" : user 
        });
    });
};

exports.update = function(req, res) {
    // Update a task identified by the taskID in the request
    
    User.findByIdAndUpdate(req.params._id, { $set: { 
       
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        sport: req.body.sport,
        coach: req.body.coach,
        coach2: req.body.coach2,
        pname: req.body.pname,
        pname2: req.body.pname2,
        pnumb: req.body.pnumb
    }}, { new: false }, function (err, user) {
        if (err) return handleError(err);
        res.render('success', { message: "User Updated successfully!" });

      });
};

exports.delete = function(req, res) {
    // Delete a task with the specified taskID in the request
    User.findByIdAndRemove(req.params._id, function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params._id});                
            }
            return res.status(500).send({message: "Could not delete user with id " + req.params._id});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params._id});
        }

        res.render('success', { message: "User deleted successfully!" });
    });
};
