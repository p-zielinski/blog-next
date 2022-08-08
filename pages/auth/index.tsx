import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserDbType } from "../../types/userDb";
import { Copyright } from "../../componets/Copyright";
import { Formik } from "formik";
import { InputText } from "../../componets/Form/Text";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import mail from "../../graphics/mail.svg";
import locker from "../../graphics/locker.svg";

type SignInSideProps = {
  user?: UserDbType;
};

const theme = createTheme();

export default function Auth({ user }: SignInSideProps) {
  const status =

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  const valuesWithEmailToLowerCase = {
                    ...values, // @ts-ignore
                    email: values.email?.toLowerCase() || "",
                  };
                  console.log(valuesWithEmailToLowerCase);

                  setSubmitting(false);
                }}
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
                  <form onSubmit={handleSubmit}>
                    {isSubmitting ? "aaa" : "bbb"}
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
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </form>
                )}
              </Formik>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export const getServerSideProps = async (context: any) => {
  const { access_token } = context.req.cookies;

  const responseUser = await fetch(process.env.API_URL + "me", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  let user;
  try {
    user = await responseUser.json();
  } catch (e) {}

  return {
    props: { user: user?._id ? user : null },
  };
};
