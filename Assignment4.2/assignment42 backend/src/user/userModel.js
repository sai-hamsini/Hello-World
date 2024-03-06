var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    rushingYards: {
        type: Number,
        required: true
    },
    touchdowns: {
        type: Number,
        required: true
    },
    sacks: {
        type: Number,
        required: true
    },
    fieldGoalsMade: {
        type: Number,
        required: true
    },
    fieldGoalsMissed: {
        type: Number,
        required: true
    },
    catches: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('teams', userSchema);