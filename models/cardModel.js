const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    image: {
        type: String
    },
    color: {
        type: String
    },
    filling: {
        type: String
    },
    shape: {
        type: String
    },
    number: {
        type: Number
    }
});

const CardModel = mongoose.model("cards", cardSchema);
module.exports = CardModel;