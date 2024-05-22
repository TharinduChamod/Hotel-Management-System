import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsappIcon from "@mui/icons-material/WhatsApp";

import { useState } from "react";

// Function to return the Footer copyight element
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="/">B2 Hotel Complex&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function About() {
  // Handling Emails and comments to the system
  //   TODO: Add database integration to save the commentys in the database
  const [userEmail, setUserEmail] = useState("");
  const [userComment, setUserComment] = useState("");

  //   Handle Email changes
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  //   Handle Comment changes
  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  //   Handle send click (validating and opening the email app of the user)
  const handleSendClick = () => {
    // Validate email format (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Example using window.location.href (for demonstration purposes only, not recommended in production)
    window.location.href = `mailto:ruwanrathnayake5@gmail.com?subject=Feedback from ${userEmail}&body=${userComment}`;
  };

  return (
    <Container
      id="about"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        marginTop: "2rem",
      }}
    >
      {/* About Us Title */}
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 5vw, 4rem)",
        }}
      >
        About&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 5vw, 4rem)",
            color: "primary.main",
          }}
        >
          Us
        </Typography>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {/* Connecting to the Email */}
        {/* This is opening the mail app for any comments and ideas from the User */}
        <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
          <Typography variant="h6" fontWeight={300} gutterBottom>
            Seeking Your Feedback to Improve Our Service
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            We're always striving to improve and provide the best possible
            experience for our valued customers like you. We'd love to hear your
            thoughts and suggestions!
          </Typography>

          {/* Get the email and Comments from the user */}
          <Stack direction="column" spacing={1} useFlexGap>
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              aria-label="Enter your email address"
              placeholder="Your email address"
              value={userEmail}
              onChange={handleEmailChange}
              inputProps={{ autoComplete: "off" }}
            />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              label="Your Comment"
              variant="outlined"
              value={userComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendClick}
              sx={{ flexShrink: 0 }}
            >
              Send
            </Button>
          </Stack>
        </Box>

        {/* Adding Google Map Location for Meduim Screens */}
        <Box
          sx={{
            display: { sx: "none", md: "flex" },
            marginLeft: "5rem",
            marginRight: "5rem",
            marginTop: "1rem",
            border: "2px solid",
            borderRadius: "2rem",
            padding: "1rem",
            borderColor: "divider",
            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          }}
        >
          {/* Add the location of the restaurant */}
          <Stack direction="column" gap="1rem">
            <Typography
              component="span"
              variant="h2"
              sx={{
                fontSize: "clamp(1rem, 5vw, 1.6rem)",
                color: "text.secondary",
                fontFamily: "sans-serif",
              }}
            >
              Where we are ...
            </Typography>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8040586209854!2d80.36398610980494!3d7.486875611189529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33956a93b1699%3A0x525a1f95c74cbc69!2sB2%20Hotel%20Complex%20Kurunegala!5e0!3m2!1sen!2slk!4v1712491595804!5m2!1sen!2slk"
              width="400rem"
              height="300em"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Copyright Text */}
        <div>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            All Rights are reserved.
          </Typography>
          <Copyright />
        </div>

        {/* Row Stack for Socail media */}
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          {/* Facebook Connect */}
          <IconButton
            color="inherit"
            href="https://www.facebook.com/p/B2-Hotel-Complex-61552820056868/"
            aria-label="Facebook"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>

          {/* WhatsApp Connect */}
          <IconButton
            color="inherit"
            href="https://wa.me/+94721599599"
            aria-label="WhatsApp"
            sx={{ alignSelf: "center" }}
          >
            <WhatsappIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
