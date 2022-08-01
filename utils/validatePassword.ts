import { sha256 } from "js-sha256";
import bcrypt from "bcrypt";

const checkUserPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(sha256(plainPassword), hashedPassword);
};

export default checkUserPassword;
