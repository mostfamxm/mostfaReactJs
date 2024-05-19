import {
  Container,
  Divider,
  ImageListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { GeneralContext } from "../App";
import { dark, light } from "../components/UI/features/theme";
import "../Assets/images/signup.png";

export default function About() {
  const { isDark } = useContext(GeneralContext);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        About
      </Typography>
      <Container>
        <Typography variant="h5">
          <b>An index of businesses designed to advertise small businesses. </b>
          <br />
          How to use the site:
        </Typography>
        <Typography variant="h6">
          <b>If you do not have an account, you must register: </b> and mark the
          type of user you want to be (regular or business)
        </Typography>
        <ImageListItem>
          <img src="signup.png" alt="signup" />
        </ImageListItem>
        <Typography variant="h6">
          <b>
            If and when you have an account, you must connect to your account by
            email and password:
          </b>
        </Typography>
        <div>
          <img srcSet="../Assets/images/login.png" alt="login" />
        </div>
        <Typography variant="h6">
          <b>When you are logged in you have several options:</b>
          <span>
            If you have a regular account, you can mark favorite cards and
            search for any business you want.
          </span>
          <span>
            If you have a business account you can add your own cards and you
            have the option to mark favorite cards
          </span>
        </Typography>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          <b>Continue to enjoy browsing the site!</b>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
