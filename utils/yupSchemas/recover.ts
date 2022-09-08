import * as yup from "yup";

const recoverSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    )
    .required(),
});

export default recoverSchema;
