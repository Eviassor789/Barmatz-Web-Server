import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Chat = new Schema({
    messagesList: {
        type: [mongoose.Schema.Types.ObjectId],
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

module.exports = mongoose.model('Chat', Chat);

function getChatsByUserName(username){
    var response = [];
    var chatsIdList = []//return here the chats Id list array of the username


    if (chatsIdList.length() == 0){
        return response;
    }
    chatsIdList.forEach(element => {
        var user_one = ""; //return here the names of the chat members by the elemnt which is a chat id
        var user_two = ""; //return here the names of the chat members by the elemnt which is a chat id
        var chat_json = {"id": "", "user": {}, "lastMessage": {}};
        chat_json.id = element;
        chat_json.user = user_one == username ? getUserDetailsByUsername(user_two) : getUserDetailsByUsername(user_one);
        chat_json.lastMessage = getLastMsgByChatId(element);

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

function getLastMsgByChatId(chatId){
    //get message json (the last table in the pdf) of the chat Id. looks like this
    // {
    //   "id": 1,
    //   "created": "2023-06-01T16:38:46.0270481",
    //   "content": "hello"
    // }
}

function getUserDetailsByUsername(username){
    //get user details: username, profile and displayName (no password) of a user, looks like this
    // {
    //     "username": "name",
    //     "displayName": "coolguy123",
    //     "profilePic": "sdlfkhszdicvha8o9vhjv9821y49238w5po23iu4589udfnc89q3h..."
    // }
}

function addChat(username, friendUserName) {
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


function getMessageDetailsById(id){
    var sender = "" //GET SENDER NAME
    answer_json = {"id": "", "created":"", "sender": {}, "content": ""}

    answer_json.id = id;
    answer_json.created = ""; // TO DO DataBase GET
    answer_json.sender = getUserDetailsByUsername(sender);
    answer_json.content = "";//GET CONTENT

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


function isMember(username, chatId){
    var chatsIdList = [] ;//return here the chats Id list array of the username from DB
    return chatsIdList.includes(chatId);  // if the user asks for a chat he is not a member of - return false.

}



function getAllChatDataByChatId(username, chatId){

    if (!isMember(username, chatId)){// if the user asks for a chat he is not a member of - return "".
        return "";
    };
    var messageIdList = []//return here the message Id list array of the chatId from DB
    var user_one = ""; //return here the names of the chat members by chat id from DB
    var user_two = ""; //return here the names of the chat members by chat id from DB

    var chat_json = {"id": "", "users": [], "messages": []};

    chat_json.id = chatId;

    chatId.users.push(getUserDetailsByUsername(user_one));
    chatId.users.push(getUserDetailsByUsername(user_two));

    messageIdList.forEach(element => {
        chat_json.messages.push(getMessageDetailsById(element))
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
  };
  