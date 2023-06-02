import Chat from "../models/chats.js";

const createChat = async (messagesList, sender, reciever) => {
    const chat = new Chat({sender, reciever});
    if (messagesList) chat.messagesList = messagesList;
    return await chat.save();
}

const readChat = async (id) => {
    return await Chat.findById(id);
}

const updateChat = async (id, messagesList) => {
    const chat = await readChat(id);
    if (!message) return null;
    chat.messagesList = messagesList;
    return await chat.save();
}

const deleteChat = async (id) => {
    const chat = await readChat(id);
    if (!chat) return null;
    return await chat.deleteOne();
}