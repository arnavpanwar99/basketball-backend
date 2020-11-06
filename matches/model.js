const mongoose = require('mongoose');
const { Schema } = mongoose;

const prevSchema = new Schema({
    players: { type: Array, unique: true, required: true },
    matches: { type: Number, default: 0 },
    wonByFirst: { type: Number, default: 0 },
    wonBySecond: { type: Number, default: 0 },
    scoredByFirst: { type: Number, default: 0 },
    scoredBySecond: { type: Number, default: 0 },
    startedAt: { type: Number, default: 0 }
});

const schema = new Schema({
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    scoredByFirst: { type: Number, default: 0 },
    scoredBySecond: { type: Number, default: 0 },
    startedAt: { type: Number, required: true },
    endsAt: { type: Number, required: true }
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id,
        delete ret.hash
    }
});

module.exports = {
    matchModel: mongoose.model('Match', schema)
};