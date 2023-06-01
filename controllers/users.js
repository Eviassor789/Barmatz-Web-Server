


function getUserDetails(req, res) {
  try {
    if (!req.params.username) {
      return res.status(401).json({ title: "unauthorized" });
    }
    var name = req.params.username;
    // var json_answer = getUser(req.params.username);
    // the getUser() function is a model function which returns the json of username, displayName and profilePic.
    // if(json_answer == null) {
    //    return res.status(401).json({"title": "there is no such user"});
    //}
    return res.status(200).json(
        //json_answer
    );
  } catch (error) {
    res.status(500).send("An error occurred while adding the user");
  }
}

function register(req, res) {
    try{
        if(req.body.username && req.body.password && req.body.displayName && req.body.profilePic) {
            //addUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic);
            //addUser adds a new user in the database, implement it in model.
            return res.status(200).json();
        } else {
            return res.status(409).json({"title": "conflict"});
        }
    } catch (error) {
        res.status(500).send("An error occurred while adding the user");
      }
}

export {getUserDetails, register}