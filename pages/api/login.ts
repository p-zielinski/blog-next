import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/services/connection";
import validateRequest from "../../utils/services/validateRequest";
import { createJWT } from "../../utils/services/JWT";
import loginSchema from "../../utils/yupSchemas/login";
import { checkPassword } from "../../utils/services/password";

xsdsad;

const defaultItems = [
  {
    productName: `“Johan & Nystrom Caravan”`,
    productDescription: `“20 oz bag”`,
    quantity: 0,
    price: 26.99,
    src: `“./images/johan2.jpeg”`,
    id: 1,
  },
  {
    productName: `“Illy Arabica”`,
    productDescription: `“Bestseller 18 oz bag”`,
    quantity: 0,
    price: 21.02,
    src: `“./images/illy_arabica.jpeg”`,
    id: 2,
  },
  {
    productName: `“Hard Beans Etiopia”`,
    productDescription: `“6 oz bag”`,
    quantity: 0,
    price: 3.88,
    src: `“./images/hardbean.jpeg”`,
    id: 3,
  },
  {
    productName: `“Johan & Nystrom Bourbon”`,
    productDescription: `“20 oz bag”`,
    quantity: 0,
    price: 41.98,
    src: `“./images/johan2.jpeg”`,
    id: 4,
  },
];

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async () => {
    switch (req.method) {
      case "GET":
        return res.json(defaultItems);
      default:
        return res.status(400).json({ error: "No Response for This Request" });
    }
  });
}
