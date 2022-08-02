import * as yup from "yup";

const loginSchema = yup.object({
  password: yup.string().min(5).required(),
  email: yup
    .string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    )
    .required(),
});

export default loginSchema;
