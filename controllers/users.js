import { getUserDetailsByUsername } from "../services/chats.js";
import { addUser } from "../services/users.js";

async function getUserDetails(req, res) {
  try {
    if (!req.params.username) {
      return res.status(401).json({ title: "unauthorized" });
    }
    var name = req.params.username;
    var json_answer = await getUserDetailsByUsername(name);
    if (json_answer == null) {
      return res.status(401).json({ title: "there is no such user" });
    }
    return res.status(200).send(json_answer);
  } catch (error) {
    res.status(500).send("An error occurred while adding the user");
  }
}

async function register(req, res) {
  try {
    if (
      req.body.username &&
      req.body.password &&
      req.body.displayName &&
      req.body.profilePic
    ) {
      if(await addUser(req.body.profilePic, req.body.displayName, req.body.password, req.body.username) != null){
        return res.status(200).send();
      }
      return res.status(409).json({ title: "conflict" }).send();
      
    } else {
      return res.status(409).json({ title: "conflict" }).send();
    }
  } catch (error) {
    res.status(500).send("An error occurred while adding the user");
  }
}

export { getUserDetails, register };
