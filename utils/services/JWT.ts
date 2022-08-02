import jwt from "jsonwebtoken";

const createJWT = (userId: string, duration: string | number | undefined) => {
  const payload = {
    userId,
  };
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET as string, {
    expiresIn: duration,
  });
};

const verifyJWT = (
  token: string
): false | { userId: string; iat: number; exp: number } => {
  //@ts-ignore
  return jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET as string,
    (error, decoded) => {
      if (error) {
        return false;
      }
      if (decoded) {
        return decoded;
      }
    }
  );
};

export { createJWT, verifyJWT };
