import { NextApiRequest } from "next";
import getBearerToken from "./getBearerToken";
import { verifyJWT } from "./JWT";

const validateJWTFromBearerToken = (req: NextApiRequest) => {
  const token = getBearerToken(req);
  if (!token) {
    return false;
  }
  return verifyJWT(token);
};
export default validateJWTFromBearerToken;
