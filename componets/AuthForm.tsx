import { InputText } from "./Form/Text";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import mail from "../graphics/mail.svg";
import locker from "../graphics/locker.svg";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as React from "react";
import { AuthPageState } from "../utils/enums/authPageState";
import loginSchema from "../utils/yupSchemas/login";
import registerSchema from "../utils/yupSchemas/register";
import recoverSchema from "../utils/yupSchemas/recover";

type AuthFormProps = {
  authPageState: AuthPageState;
  setAuthPageState: (FORGOT_PASSWORD: AuthPageState) => unknown;
};

const blueUnderlinedTextStyle = {
  color: `rgb(29,106,198)`,
  textDecoration: "underline",
  fontSize: "0.875rem",
  cursor: "pointer",
};

export const AuthForm = ({
  authPageState,
  setAuthPageState,
}: AuthFormProps) => {
  const onLogin = async (emailAndPassword: {
    email: string;
    password: string;
  }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailAndPassword),
    });
    console.log(response);
    return;
  };

  const onRegister = async (emailAndPassword: {
    email: string;
    password: string;
  }) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailAndPassword),
    });
    console.log(response);
    return;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        const emailAndPassword = {
          ...values,
          email: values.email?.toLowerCase() || "",
        };
        if (authPageState === AuthPageState.LOGIN) {
          await onLogin(emailAndPassword);
        }
        if (authPageState === AuthPageState.REGISTER) {
          await onRegister(emailAndPassword);
        }

        setSubmitting(false);
      }}
      validationSchema={
        authPageState === AuthPageState.LOGIN
          ? loginSchema
          : authPageState === AuthPageState.REGISTER
          ? registerSchema
          : recoverSchema
      }
    >
      {({
        handleSubmit,
        isSubmitting,
        values,
        errors,
        isValid,
        setFieldValue,
        touched,
      }) => (
        <>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <InputText
              startAdornment={
                <InputAdornment position="start" sx={{ mb: 2 }}>
                  <Image src={mail} alt="mail" />
                </InputAdornment>
              }
              type="text"
              name="email"
              label="Email address"
            />
            {[AuthPageState.LOGIN, AuthPageState.REGISTER].includes(
              authPageState
            ) && (
              <InputText
                startAdornment={
                  <InputAdornment position="start" sx={{ mb: 2 }}>
                    <Image src={locker} alt="locker" />
                  </InputAdornment>
                }
                type="password"
                name="password"
                label="Password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {authPageState === AuthPageState.LOGIN
                ? `Sign in`
                : authPageState === AuthPageState.REGISTER
                ? `Sign up`
                : `Recover account`}
            </Button>
            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              {authPageState !== AuthPageState.REGISTER && (
                <span
                  onClick={() => setAuthPageState(AuthPageState.REGISTER)}
                  style={blueUnderlinedTextStyle}
                >
                  Don't have an account? Sign Up
                </span>
              )}
              {authPageState !== AuthPageState.LOGIN && (
                <span
                  onClick={() => setAuthPageState(AuthPageState.LOGIN)}
                  style={blueUnderlinedTextStyle}
                >
                  Already have an account? Sign In
                </span>
              )}
              {authPageState !== AuthPageState.FORGOT_PASSWORD && (
                <span
                  onClick={() =>
                    setAuthPageState(AuthPageState.FORGOT_PASSWORD)
                  }
                  style={blueUnderlinedTextStyle}
                >
                  Forgot password?
                </span>
              )}
            </div>
          </form>
        </>
      )}
    </Formik>
  );
};

export default AuthForm;
