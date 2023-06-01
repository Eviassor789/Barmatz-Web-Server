import { hasUser } from "../models/tokens.js";

const validateTokenParams = (name, password) => {
  if (name != "" && password != "") {
    return hasUser(name, password);
  } else return false;
};

export { validateTokenParams };
