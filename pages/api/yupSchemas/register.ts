import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

const registerSchema = yup.object({
  password: yup
    .string()
    .password()
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .minSymbols(1)
    .min(5)
    .required(),
  email: yup
    .string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    )
    .required(),
});

export default registerSchema;
