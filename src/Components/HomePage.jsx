import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import '../Design/HomePage.css'; // Ensure this path is correct

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed" className="AppBar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HueMatch
          </Typography>
          <Button color="inherit" component={Link} to="/ColorSequenceGame">
            Start Game
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ marginLeft: 'auto' }}>
            About Us
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        className="main-content"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}
      >
        <Typography variant="h2" className="home-title">
          Welcome to the Color Sequence Game!
        </Typography>
        <Typography variant="body1" className="home-description">
          Match the color sequence by clicking the correct boxes in order. Click "Start Game" to begin.
        </Typography>
        <Box sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h6" className="features-title">
            Game Features:
          </Typography>
          <List>
            <ListItem>• Colorful and engaging gameplay</ListItem>
            <ListItem>• Playable in single-player or multi-player modes</ListItem>
            <ListItem>• Easy-to-understand rules</ListItem>
            <ListItem>• Track and compare scores with other players</ListItem>
          </List>
        </Box>
        <Box sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h6" className="instructions-title">
            Instructions:
          </Typography>
          <Typography variant="body1" className="instructions-text">
            1. Click the "Start Game" button to begin a new game.<br />
            2. Memorize the color sequence that flashes.<br />
            3. Click the boxes in the same order as the sequence.<br />
            4. If you complete the sequence correctly, you earn a point.<br />
            5. If you make a mistake, the sequence will restart.<br />
            6. In multi-player mode, players take turns to complete the sequence.<br />
            7. The player with the highest score at the end of the game wins.
          </Typography>
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" className="credits-text">
            Developed by Ronan Jake C. Paquera
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
