import Message from "../models/messages.js";

const createMessage = async (content, sender, created) => {
    const message = new Message({content, sender});
    if (created) message.created = created;
    return await message.save();
}

const readMessage = async (id) => {
    return await Message.findById(id);
}

const updateMessage = async (id, content) => {
    const message = await readMessage(id);
    if (!message) return null;
    message.content = content;
    return await message.save();
}

const deleteMessage = async (id) => {
    const message = await readMessage(id);
    if (!message) return null;
    return await message.deleteOne();
}