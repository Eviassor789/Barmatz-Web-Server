import express, { urlencoded } from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import customEnv from 'custom-env';
import routesChats from './routes/chats.js';
import routesTokens from'./routes/tokens.js';
import routesUsers from './routes/users.js';

// customEnv.env(process.env.NODE_ENV, './config')
//process.env.CONNECTION_STRING
mongoose.connect("mongodb://localhost:27017/myDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 //Dont know why but without it I get an error and it crashes //// - its ipv4
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cors());
// app.use(json());
app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');

app.use('/api/Tokens', routesTokens);
app.use('/api/Chats', routesChats);
app.use('/api/Users', routesUsers);

// app.listen(process.env.PORT);
app.listen(5000);



// HERE ...

import { User } from './models/users.js';
import { Chat } from './models/chats.js';
import { Message } from './models/messages.js';
import { futimes } from 'fs';

var highestIdUsers;
var highestIdChats;
var highestIdMsg;

(async() => {


await User.findOne().sort('-score').exec((error, user) => {
    if (error) {
      console.error('Error finding user:', error);
    } else if (user) {
      console.log('User with the highest score:', user);
      highestIdUsers = user;
    } else {
      console.log('No users found');
    }
  });

  await Chat.findOne().sort('-score').exec((error, chat) => {
    if (error) {
      console.error('Error finding user:', error);
    } else if (chat) {
      console.log('chat with the highest score:', chat);
      highestIdChats = chat;
    } else {
      console.log('No chats found');
    }
  });

  await Message.findOne().sort('-score').exec((error, message) => {
    if (error) {
      console.error('Error finding user:', error);
    } else if (message) {
      console.log('message with the highest score:', message);
      highestIdMsg = message;
    } else {
      console.log('No messages found');
    }
  });
})();

 function getHighestIdUsers(){
    return highestIdUsers;
 }

 function increaseHighestIdUsers(){
    highestIdUsers++;
 }

 function getHighestIdChats(){
    return highestIdChats;
 }
 
 function increaseHighestIdChats(){
    highestIdChats++;
 }

 function getHighestIdMsg(){
    return highestIdMsg;
 }
 
 function increaseHighestIdMsg(){
    highestIdMsg++;
 }

 export {
    getHighestIdChats,
    getHighestIdMsg,
    getHighestIdUsers,
    increaseHighestIdChats,
    increaseHighestIdMsg,
    increaseHighestIdUsers
 }
 


