import { sha256 } from "js-sha256";
import bcrypt from "bcrypt";

const createPassword = async (
  string: string,
  saltRounds = parseInt(process.env.SALT_ROUNDS as string) || 10
): Promise<string> => {
  return await bcrypt.hash(sha256(string), saltRounds);
};

const checkPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(sha256(plainPassword), hashedPassword);
};

export { createPassword, checkPassword };
