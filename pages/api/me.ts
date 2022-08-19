import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/services/connection";
import validateJWTFromBearerToken from "../../utils/services/validateJWTFromBearerToken";
import { add1 } from "../../db/test";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    console.log(add1());
    switch (req.method) {
      case "GET":
        const session = validateJWTFromBearerToken(req);
        if (!session) {
          return res.status(401).json({ error: "Please login." });
        }
        const { User } = await connect(); // connect to database
        const user = await User.findOne({ _id: session.userId });
        if (!user) {
          return res.status(400).json({ error: "Could not find user." });
        }
        return res.status(200).json(user);
      default:
        return res.status(400).json({ error: "No Response for This Request" });
    }
  });
}
