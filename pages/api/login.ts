import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/services/connection";
import validateRequest from "../../utils/services/validateRequest";
import { createJWT } from "../../utils/services/JWT";
import loginSchema from "../../utils/yupSchemas/login";
import { checkPassword } from "../../utils/services/password";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    switch (req.method) {
      case "POST":
        const { body, error, valid } = await validateRequest(
          loginSchema,
          req.body
        );
        if (error || !valid) {
          return res
            .status(400)
            .json({ error: error ? error : "Could not create new user." });
        }
        const { User } = await connect(); // connect to database
        const requestedUser = await User.findOne({ email: body.email });
        if (!requestedUser) {
          return res
            .status(400)
            .json({ error: "Invalid username or password." });
        }
        if (!(await checkPassword(body.password, requestedUser.password))) {
          return res
            .status(400)
            .json({ error: "Invalid username or password." });
        }
        return res.json({ token: createJWT(requestedUser._id, "1d") });
      default:
        return res.status(400).json({ error: "No Response for This Request" });
    }
  });
}
