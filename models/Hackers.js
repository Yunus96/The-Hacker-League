const mongoose = require('mongoose');

const hackersSchema = new mongoose.Schema({
    team_name:{
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    wins: {
        type: Number,
        total_wins: { type: Number, default: 0}
    },
    losses: {
        type: Number,
        total_losses: { type: Number, default: 0}
    },
    ties: {
        type: Number,
        total_ties: { type: Number, default: 0}
    },
    scores: {
        type: Number,
        total_scores: { type: Number, default: 0}
    }
});

module.exports = mongoose.model('Hackers',hackersSchema)