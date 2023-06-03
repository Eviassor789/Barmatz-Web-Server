import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Message = new Schema({
    _id: {
        type: Number,
    },
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', Message);
