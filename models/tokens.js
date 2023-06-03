import { readUserByName } from "../services/users.js";


function hasUser(name, password) {
    user = readUserByName(name);
    if (!user) return false;
    if (user.password != password) return false;
    
    return true;
}

export {
    hasUser  
}