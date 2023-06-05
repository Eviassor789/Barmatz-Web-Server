import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageModel = new Schema({
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

const Message = mongoose.model('Message', MessageModel);

export{
    Message
}
