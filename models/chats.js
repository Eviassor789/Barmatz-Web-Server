import mongoose from "mongoose";
import { getChatsListOfUserByUsername, getProfilePicOfUserByUsername, getDisplasyNameUserByUsername} from "../services/users.js";
import { createChat, getMessagesList, getUser1, getUser2, readChat} from "../services/chats.js";
import { readMessage } from "../services/messages.js";

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    _id: {
        type: Number,
    },
    messagesList: {
        type: [Number],
        default: []
    },
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

const getChatsByUserName = async(username) => {
    var response = [];
    var chatsIdList = await getChatsListOfUserByUsername(username);


    if (chatsIdList.length == 0){
        return response;
    }
    chatsIdList.forEach(async(element) => {
        var user_one = await getUser1(element);
        var user_two = await getUser2(element);
        var chat_json = {"id": "", "user": {}, "lastMessage": {}};
        chat_json.id = element;
        chat_json.user = user_one == username ? await getUserDetailsByUsername(user_two) : await getUserDetailsByUsername(user_one);
        chat_json.lastMessage = await getLastMsgByChatId(element);

        response.push(chat_json)
    });

    // that is the format of each chat_json
    // {
    //  "id": 1,
    //  "user":     {
    //     "username": "name",
    //     "displayName": "coolguy123",
    //     "profilePic": "sdlfkhszdicvha8o9vhjv9821y49238w5po23iu4589udfnc89q3h..."
    // }, 
    //  "lastMessage": {
    //      "id": 1,
    //      "created": "2023-06-01T16:38:46.0270481",
    //      "content": "hello"
    //    }  
    // }

        return response;

}

const getLastMsgByChatId = async(chatId) => {
    var messagesList = await readChat(chatId).messagesList;
    return messagesList[messagesList.length - 1];
    
    //get message json (the last table in the pdf) of the chat Id. looks like this
    // {
    //   "id": 1,
    //   "created": "2023-06-01T16:38:46.0270481",
    //   "content": "hello"
    // }
}

const getUserDetailsByUsername = async(username) => {
    var userDetails_json = {"username": "", "displayName": "", "profilePic": ""};
    userDetails_json.username = username;
    userDetails_json.displayName = await getDisplasyNameUserByUsername(username);
    userDetails_json.profilePic = await getProfilePicOfUserByUsername(username);
    return userDetails_json;

    //get user details: username, profile and displayName (no password) of a user, looks like this
    // {
    //     "username": "name",
    //     "displayName": "coolguy123",
    //     "profilePic": "sdlfkhszdicvha8o9vhjv9821y49238w5po23iu4589udfnc89q3h..."
    // }
}

const addChat = async(username, friendUserName) => {
    var chat = await createChat(username, friendUserName);
    var chatsList1 = await getChatsListOfUserByUsername(username)
    chatsList1.push(chat._id);
    await updateChatsListOfUserByName(username, chatsList1);
    var chatsList2 = await getChatsListOfUserByUsername(friendUserName)
    chatsList2.push(chat._id);
    await updateChatsListOfUserByName(username, chatsList2);

    var response_json = {"id": "", "user": {}};
    response_json.id = chat._id;
    response_json.user = await getUserDetailsByUsername(username); //SHOULD IT BE friendUserName ??? ////////////////////////////////////////////
    return response.json;

//add the chat to the chat table and add the chat to the chatlist of each user.

//return json like this:
//{
//  "id": 13,
//  "user": {
//    "username": "bb",
//    "displayName": "bb",
//    "profilePic": "sdkfjsdkvnsd79f23h78q9w3hf9whfosifh938shvlhvjw8..."
//  }
//}

}


const getMessageDetailsById = async(id) => {
    var sender = await readMessage(id).sender;
    answer_json = {"id": "", "created":"", "sender": {}, "content": ""}

    answer_json.id = id;
    answer_json.created = await readMessage(id).created;
    answer_json.sender = await getUserDetailsByUsername(sender);
    answer_json.content = await readMessage(id).content;

    return answer_json;

//   {
//     "id": 1,
//     "created": "2023-06-01T16:38:46.0270481",
//     "sender": {
//       "username": "aa",
//       "displayName": "aa",
//       "profilePic": "sdkfjsdkvnsd79f23h78q9w3hf9whfosifh938shvlhvjw8..."
//          },
//      "content": "aaaaa"
//   }
}


const isMember = async(username, chatId) => {
    var chatsIdList = await getChatsListOfUserByUsername(username);
    return chatsIdList.includes(chatId);  // if the user asks for a chat he is not a member of - return false.

}



const getAllChatDataByChatId = async(username, chatId) => {

    if (!await isMember(username, chatId)){// if the user asks for a chat he is not a member of - return "".
        return "";
    };
    var messageIdList = await getMessagesList(chatId);
    var user_one = await getUser1(chatId);
    var user_two = await getUser2(chatId);

    var chat_json = {"id": "", "users": [], "messages": []};

    chat_json.id = chatId;

    chatId.users.push(await getUserDetailsByUsername(user_one));
    chatId.users.push(await getUserDetailsByUsername(user_two));

    messageIdList.forEach(async(element) => {
        chat_json.messages.push(await getMessageDetailsById(element))
    });


    return chat_json;

//{
// "id": 3,
// "users": [
//   {
//     "username": "aa",
//     "displayName": "aa",
//     "profilePic": "sdkfjsdkvnsd79f23h78q9w3hf9whfosifh938shvlhvjw8..."
// },
// {
//   "username": "bb",
//   "displayName": "bb",
//   "profilePic": "sdkfjsdkvnsd79f23h78q9w3hf9whfosifh938shvlhvjw8..."
// }
// ],
// "messages":
// [
//   {
//     "id": 1,
//     "created": "2023-06-01T16:38:46.0270481",
//     "sender": {
//       "username": "aa",
//       "displayName": "aa",
//       "profilePic": "sdkfjsdkvnsd79f23h78q9w3hf9whfosifh938shvlhvjw8..."
//      },
// "content": "aaaaa"
//   }
//  ]
// }

}












export {
    getChatsByUserName,
    getUserDetailsByUsername,
    addChat,
    getAllChatDataByChatId,
    isMember,
    Chat
  };
  