import {User} from "../models/users.js";
import { getHighestIdUsers, increaseHighestIdUsers } from "../app.js";

const addUser = async (profilePic, displayName, password, username) => {
    const doesExistAlready = await readUserByName(username);
    if (doesExistAlready) return null;

    var userID = getHighestIdUsers()+1;
    increaseHighestIdUsers();

    return await createUser(userID, profilePic, displayName, password, username);
} 

const createUser = async (userID, profilePic, displayName, password, username) => {
    const user = new User( {"userId":userID, profilePic, displayName, password, username});
    user.chatsList = [];
    return await user.save();
}


const readUserByName = async (username) => {
    return await User.findOne({username});
}

const getChatsListOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.chatsList;
}

const getProfilePicOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.profilePic;
}

const getDisplasyNameUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.displayName;
}

const updateChatsListOfUserByName = async (username, chatsList) => {
    const user = await readUserByName(username);
    if (!user) return null;
    user.chatsList = chatsList;
    return await user.save();
}

const deleteUserByName = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return await user.deleteOne();
}

//CRUD

export {
    createUser,
    readUserByName,
    updateChatsListOfUserByName,
    deleteUserByName,
    getChatsListOfUserByUsername,
    getProfilePicOfUserByUsername,
    getDisplasyNameUserByUsername,
    addUser
};