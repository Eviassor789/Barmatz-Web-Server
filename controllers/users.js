


function getUserDetails(req, res) {
  try {
    if (!req.params.username) {
      return res.status(401).json({ title: "unauthorized" });
    }
    var name = req.params.username;
    // var json_answer = getUser(req.params.username);
    // the getUser() function is a model function which returns the json of username, displayName and profilePic.
    // if(json_answer == null) {
    //    res.status(401);
    //    res.title("unauthorized")
    //    return res.json();
    //}
    return res.status(200).json(
        //json_answer
    );
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding the user",
      error: error.message,
    });
  }
}

function register(req, res) {


    return res.json();
}

export {getUserDetails, register}