var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Task', taskSchema);
