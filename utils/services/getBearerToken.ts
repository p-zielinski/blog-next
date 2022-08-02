import { NextApiRequest } from "next";

const getBearerToken = (req: NextApiRequest) => {
  const authorization = req.headers?.authorization;
  if ((authorization as string)?.length < 8) return null;
  return (authorization as string).slice(7);
};

export default getBearerToken;
