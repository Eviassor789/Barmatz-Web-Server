const validateTokenParams = async (name, password) => {
  if (name != "" && password != "") {
    var answer = await hasUser(name, password);
    console.log(answer);
    return answer;

  } else return false;
};

const hasUser = async (name, password) => {
  var user = await readUserByName(name);
  if (!user) return false;
  if (user.password != password) return false;
  
  return true;
}

export { 
  validateTokenParams,
  hasUser  
};
