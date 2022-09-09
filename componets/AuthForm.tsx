import { InputText } from "./Form/Text";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import mail from "../graphics/mail.svg";
import locker from "../graphics/locker.svg";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as React from "react";
import { AuthPageState } from "../utils/enums/authPageState";

import recoverSchema from "../utils/yupSchemas/recover";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import loginRegisterSchema from "../utils/yupSchemas/loginRegister";
import { blueUnderlinedTextStyle } from "../styles/blueUnderlinedTextStyle";

type AuthFormProps = {
  authPageState: AuthPageState;
  setAuthPageState: (FORGOT_PASSWORD: AuthPageState) => unknown;
};

export const AuthForm = ({
  authPageState,
  setAuthPageState,
}: AuthFormProps) => {
  const [error, setError] = useState<Error | undefined>(undefined);

  const onLoginOrRegister = async (
    emailAndPassword: {
      email: string;
      password: string;
    },
    endpoint: "login" | "register"
  ): Promise<boolean> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailAndPassword),
    });
    let responseJSON;
    try {
      responseJSON = await response.json();
    } catch (e) {
      setError(new Error("Communication error with the server"));
      return false;
    }
    if (responseJSON.token) {
      const jwtDecoded: { exp: number } = jwt_decode(responseJSON.token);
      await Cookies.set("access_token", responseJSON.token, {
        expires: new Date(jwtDecoded.exp * 1000),
        path: "/",
      });
      return true;
    }
    if (responseJSON.error) {
      setError(new Error(responseJSON.error));
    }
    return false;
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setError(undefined);
        const emailAndPassword = {
          ...values,
          email: values.email?.toLowerCase() || "",
        };
        if (authPageState === AuthPageState.LOGIN) {
          await onLoginOrRegister(emailAndPassword, "login");
        }
        if (authPageState === AuthPageState.REGISTER) {
          await onLoginOrRegister(emailAndPassword, "register");
        }
        console.log();

        setSubmitting(false);
      }}
      validationSchema={
        [AuthPageState.LOGIN, AuthPageState.REGISTER].includes(authPageState)
          ? loginRegisterSchema
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
        setErrors,
      }) => {
        useEffect(() => {
          setErrors({});
        }, [authPageState]);
        return (
          <>
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", maxWidth: "600px" }}
            >
              {error && (
                <Alert sx={{ mb: 2 }} severity="error">
                  {error.toString()}
                </Alert>
              )}
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
        );
      }}
    </Formik>
  );
};

export default AuthForm;
