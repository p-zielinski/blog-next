import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";
import registerSchema from "./yupSchemas/register";
import validateRequest from "../../utils/validate";
import hashString from "../../utils/hashString";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve) => {
    switch (req.method) {
      case "POST":
        const { body, error, valid } = await validateRequest(
          registerSchema,
          req.body
        );
        if (error || !valid) {
          return res.status(400).json({ error });
        }
        const { User } = await connect(); // connect to database
        if (await User.count({ email: body.email })) {
          return res
            .status(400)
            .json({ error: "This email is already in use." });
        }
        const newUser = await User.create({
          ...body,
          password: await hashString(body.password),
        });
        console.log(newUser);
        return res.json({});
      default:
        return res.status(400).json({ error: "No Response for This Request" });
    }
  });
}
