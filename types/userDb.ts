import { UserRoles } from "../utils/enums/userRoles";

export type UserDbType = {
  _id: string;
  password: string;
  email: string;
  email_confirmed: boolean;
  role: UserRoles;
  created_at: string;
  __v: 0;
};
