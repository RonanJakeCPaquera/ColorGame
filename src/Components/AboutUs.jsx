// AboutUs.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Design/AboutUs.css'; // Ensure this path is correct

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Box className="about-us-container" sx={{ p: 3, textAlign: 'center' }}>
      <Typography 
        variant="h2" 
        className="about-us-title"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 700,
          color: '#333',
          marginBottom: 2,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        HueMatch
      </Typography>
      <Typography variant="body1" className="about-us-content" sx={{ fontFamily: 'Roboto, sans-serif', color: '#666', mb: 3 }}>
        Welcome to HueMatch! This color sequence game was created by Ronan Jake C. Paquera as part of a school laboratory exercise at Cebu Institute of Technology - University. It's designed to be fun and test your color recognition skills.

        <br /><br />
        I’m still learning, and this project is part of my ongoing journey. There might be some rough spots, but I'm doing my best. If you have any feedback or need help, please contact me at ronanjake.paquera@cit.edu. Your input is valuable.

        <br /><br />
        I’d like to extend my thanks to my professor, friends, and the online sources that provided support. Special thanks to the AI tools that guided me through this process. Your assistance has been greatly appreciated.

        <br /><br />
        For this project, I used Visual Studio Code as my IDE, JavaScript with React for the development, and GitHub for deploying the game online. I hope this project helps other students and provides useful insights into game development. Just do it!
      </Typography>
      <Box className="button-container" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          className="back-button"
          onClick={handleBackToHome} // Attach the click handler
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
