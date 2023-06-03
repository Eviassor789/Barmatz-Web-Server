import Chat from "../models/chats.js";

const createChat = async (messagesList, user1, user2) => {
    const chat = new Chat({user1, user2});
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

//CRUD

export {
    createChat,
    readChat,
    updateChat,
    deleteChat
};
