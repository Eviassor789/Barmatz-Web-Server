import { getUserDetailsByUsername } from "../models/chats.js";
import { addUser } from "../models/users.js";

function getUserDetails(req, res) {
  try {
    if (!req.params.username) {
      return res.status(401).json({ title: "unauthorized" });
    }
    var name = req.params.username;
    var json_answer = getUserDetailsByUsername(name);
    if (json_answer == null) {
      return res.status(401).json({ title: "there is no such user" });
    }
    return res.status(200).send(json_answer);
  } catch (error) {
    res.status(500).send("An error occurred while adding the user");
  }
}

function register(req, res) {
  try {
    if (
      req.body.username &&
      req.body.password &&
      req.body.displayName &&
      req.body.profilePic
    ) {
      addUser(req.body.profilePic, req.body.displayName, req.body.password, req.body.username);
      //if failed because username already exists, function will return null. Need to do something with it? notify client? /////////////
      return res.status(200).send();
    } else {
      return res.status(409).json({ title: "conflict" }).send();
    }
  } catch (error) {
    res.status(500).send("An error occurred while adding the user");
  }
}

export { getUserDetails, register };
