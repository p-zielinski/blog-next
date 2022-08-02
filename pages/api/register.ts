import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/services/connection";
import registerSchema from "../../utils/yupSchemas/register";
import validateRequest from "../../utils/services/validateRequest";
import { createJWT } from "../../utils/services/JWT";
import { createPassword } from "../../utils/services/password";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    switch (req.method) {
      case "POST":
        const { body, error, valid } = await validateRequest(
          registerSchema,
          req.body
        );
        if (error || !valid) {
          return res
            .status(400)
            .json({ error: error ? error : "Could not create new user." });
        }
        const { User } = await connect(); // connect to database
        if (await User.findOne({ email: body.email })) {
          return res
            .status(400)
            .json({ error: "This email is already in use." });
        }
        const newUser = await User.create({
          ...body,
          password: await createPassword(body.password),
        });
        if (!newUser?._id) {
          return res.status(400).json({ error: "Could not create new user." });
        }
        return res.json({ token: createJWT(newUser._id, "1d") });
      default:
        return res.status(400).json({ error: "No Response for This Request" });
    }
  });
}
