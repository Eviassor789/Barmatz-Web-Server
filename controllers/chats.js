import {
  getChatsByUserName,
  addChat,
  getAllChatDataByChatId,
  isMember,
  deleteChatById,
} from "../services/chats.js";
import { addMsgByChatId } from "../services/chats.js";

import jwt from "jsonwebtoken";
const key = "Never gonna give you up";

function getAllChats(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, key);
    const username = data.username;
    var chats_list = getChatsByUserName(username);
    return res.status(200).send(chats_list);
  } catch (error) {
    res.status(500).send("error occuered");
  }
}

async function addNewChat(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, key);
    const username = data.username;
    const friendUserName = req.body.username;
    if (username == friendUserName) {
      return res.status(400).send("Thou shalt not talk with thy self");
    }
    var answer = await addChat(username, friendUserName); //return json created chat if addition succeded, else return: ''.

    if (answer != null) {
      return res.status(200).send(answer);
    }

    return res.status(409).send("no such user");
  } catch (error) {
    return res.status(500).send("error occuered");
  }
}

function getChatDetails(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, key);
  const username = data.username;
  const chatId = req.params.id;
  var answer_json = getAllChatDataByChatId(username, chatId);
  if (answer_json == "") {
    return res.status(401).json({
      type: "https://tools.ietf.org/html/rfc7235#section-3.1",
      title: "Unauthorized",
      status: 401,
      traceId: "00-88c61470518dfaf201277e1fff706aab-a0b3b80cddabdb4a-00",
    });
  }
  return res.status(200).send(answer_json);
}

function deleteChat(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, key);
  const username = data.username;
  const chatId = req.params.id;

  if (!isMember(username, chatId)) {
    return res.status(401).json({
      type: "https://tools.ietf.org/html/rfc7235#section-3.1",
      title: "Unauthorized",
      status: 401,
      traceId: "00-88c61470518dfaf201277e1fff706aab-a0b3b80cddabdb4a-00",
    });
  }
  deleteChatById(chatId);

  return res.status(200).send("chat deleted succesfully");
}

async function sendMessage(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, key);
  const username = data.username;
  const chatId = req.params.id;
  const content = req.body.msg;

  if (!(await isMember(username, chatId))) {
    return res.status(401).json({
      type: "https://tools.ietf.org/html/rfc7235#section-3.1",
      title: "Unauthorized",
      status: 401,
      traceId: "00-88c61470518dfaf201277e1fff706aab-a0b3b80cddabdb4a-00",
    });
  }

  var answer_json = await addMsgByChatId(username, chatId, content);
  if (answer_json != null) {
    return res.status(200).send(answer_json);
  }
  return res.status(500).send("error occuered on sending msg");
}

function getChatMesaages(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const data = jwt.verify(token, key);
  const username = data.username;
  const chatId = req.params.id;

  return res.json();
}

export {
  getAllChats,
  addNewChat,
  getChatDetails,
  deleteChat,
  sendMessage,
  getChatMesaages,
};
