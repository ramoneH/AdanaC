var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    task: String, 
    desc: {type: String, default: 'None at the moment'},
    comp: {type: Boolean, default: false},
    ass: {type: Boolean, default: true }
},{
    timestamps: true
});
TaskSchema.set('collection', 'taskcollection');
module.exports = mongoose.model('Task', TaskSchema);