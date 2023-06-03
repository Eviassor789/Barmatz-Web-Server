import Chat from "../models/chats.js";

const createChat = async (messagesList, user1, user2) => {
    const chat = new Chat({user1, user2});
    if (messagesList) chat.messagesList = messagesList;
    return await chat.save();
}

const readChat = async (id) => {
    return await Chat.findById(id);
}

const updateMessagesListOfChat = async (id, messagesList) => {
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

const getUser1 = async (id) => {
    const chat = await readChat(id);
    if (!message) return null;
    return chat.user1;
}

const getUser2 = async (id) => {
    const chat = await readChat(id);
    if (!message) return null;
    return chat.user2;
}

const getMessagesList = async (id) => {
    const chat = await readChat(id);
    if (!message) return null;
    return chat.messagesList;
}

export {
    createChat,
    readChat,
    updateMessagesListOfChat,
    deleteChat,
    getUser1,
    getUser2,
    getMessagesList
};
