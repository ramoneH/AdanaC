var mongoose = require('mongoose');

var getID = require('mongoDB').ObjectID;

var UserSchema = mongoose.Schema({
    name: {type: String, default: 'NEW USER'},
    address: {type: String, default: '123 Street'},
    phone: {type: Number, default: '0000000000'},
    age: {type: Number, default: 0 },
    weight: {type: Number, default: 0},
    height: {type: Number, default: 0},
    sport: {type: String, default: 'all'},
    coach: {type: String, default: 'coach1'},
    coach2: {type: String, default: 'coach2'},
    pname: {type: String, default: 'parent1'},
    pname2: {type: String, default: 'parent1'},
    pnumb: {type: Number, default: '0000000000'}

    
},{
    timestamps: true
});

UserSchema.set('collection', 'usercollection');

module.exports = mongoose.model('User', UserSchema);
// Get User By ID

module.exports.getUserByID = function(user, callback) {
    User.findById(getID(user), callback);
};