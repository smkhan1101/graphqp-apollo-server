const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{
    timestapms: true
});

module.exports = mongoose.model('Task' , TaskSchema);