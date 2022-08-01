import { AnyObject } from "yup/lib/object";

const validateRequest = async (schema: AnyObject, body: any) => {
  const newBody: any = {};
  for (const key of Object.keys(schema.fields)) {
    newBody[key] = body?.[key];
  }
  try {
    return { body: await schema.validate(newBody), valid: true };
  } catch (error) {
    return { body: undefined, valid: false, error };
  }
};

export default validateRequest;
