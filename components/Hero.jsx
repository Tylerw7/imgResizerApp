import React from 'react'
import { Box, Typography, Button, Container } from "@mui/material";

const Hero = () => {
  return (
    <>
        <Box
      sx={{
        height: "90vh",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?nature')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Our App
        </Typography>
        <Typography variant="h6" mb={3}>
          Create amazing experiences with our platform.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
    </>
  )
}

export default Hero