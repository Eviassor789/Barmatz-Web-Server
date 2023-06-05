import { readUserByName } from "../services/users.js";


const hasUser = async (name, password) => {
    var user = await readUserByName(name);
    if (!user) return false;
    if (user.password != password) return false;
    
    return true;
}

export {
    hasUser  
}