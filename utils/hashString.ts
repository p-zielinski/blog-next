import { sha256 } from "js-sha256";
import bcrypt from "bcrypt";

const hashString = async (
  string: string,
  saltRounds = parseInt(process.env.SALT_ROUNDS as string) || 10
): Promise<string> => {
  return await bcrypt.hash(sha256(string), saltRounds);
};

export default hashString;
