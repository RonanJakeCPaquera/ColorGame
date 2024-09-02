import React from 'react';
import { Box, Typography, Button, TextField, AppBar, Toolbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ColorSchemeGrid from './ColorSchemeGrid'; // Ensure this path is correct
import '../Design/GameMechanics.css'; // Ensure this path is correct

const vibrantColors = [
  '#FF8C00', '#FF0000', '#E066FF', '#4B0082', '#8B008B',
  '#008000', '#FFB6C1', '#FFFF00', '#00CED1'
];

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function GameMechanics() {
  const [targetColors, setTargetColors] = React.useState([]);
  const [shuffledColors, setShuffledColors] = React.useState([]);
  const [visibleColors, setVisibleColors] = React.useState(Array(9).fill(false));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isGameFinished, setIsGameFinished] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
  const [scores, setScores] = React.useState([]);
  const [playerCount, setPlayerCount] = React.useState(1);
  const [playerNameInputs, setPlayerNameInputs] = React.useState(['']);
  const [nameSubmitted, setNameSubmitted] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [navigateTo, setNavigateTo] = React.useState('');

  const navigate = useNavigate();

  const handleStartGame = () => {
    const newTargetColors = shuffleArray([...vibrantColors]);
    setTargetColors(newTargetColors);
    setShuffledColors(shuffleArray([...newTargetColors]));
    setVisibleColors(Array(9).fill(false));
    setCurrentIndex(0);
    setIsGameFinished(false);
  };

  const handleClickColor = (index, color) => {
    if (isGameFinished || !nameSubmitted) return;

    if (color === targetColors[currentIndex]) {
      const newVisibleColors = [...visibleColors];
      newVisibleColors[index] = true;
      setVisibleColors(newVisibleColors);

      if (currentIndex === targetColors.length - 1) {
        // Successful sequence completion
        const newScores = [...scores];
        newScores[currentPlayerIndex] += 1; // Increase score for the current player
        setScores(newScores);

        const continuePlaying = window.confirm(`Congratulations ${players[currentPlayerIndex]}! You completed the sequence with a score of ${newScores[currentPlayerIndex]}. Do you want to continue to the next player?`);
        if (continuePlaying) {
          setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerCount);
          handleStartGame();
        } else {
          alert(`Thank you for playing! Here are the final scores:\n${players.map((name, index) => `${name}: ${newScores[index]}`).join('\n')}`);
          setNameSubmitted(false);
          setScores(Array(playerCount).fill(0));
          navigate('/'); // Redirect to the homepage
        }
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // Incorrect move
      if (playerCount > 1) {
        // Pass turn to the next player if there are multiple players
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerCount);
      }
      setTimeout(() => {
        setVisibleColors(Array(9).fill(false));
        setCurrentIndex(0);
      }, 300);
    }
  };

  const handleSubmitNames = () => {
    if (playerNameInputs.every(name => name.trim())) {
      setPlayers(playerNameInputs);
      setScores(Array(playerCount).fill(0));
      setNameSubmitted(true);
      handleStartGame();
    } else {
      alert('Please enter names for all players before starting the game.');
    }
  };

  const handleClearNames = () => {
    setPlayerNameInputs(Array(playerCount).fill(''));
  };

  const handlePlayerCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setPlayerCount(count);
    setPlayerNameInputs(Array(count).fill(''));
    setPlayers([]);
    setScores([]);
    setNameSubmitted(false);
  };

  const handleHomeClick = () => {
    if (nameSubmitted) {
      setOpenDialog(true);
      setNavigateTo('/'); // Set the navigation path
    } else {
      navigate('/');
    }
  };

  const handleCloseDialog = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      alert("Thank you for playing!");
      navigate(navigateTo);
    } else {
      alert("Enjoy your game!");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <AppBar position="fixed" sx={{ width: '100%', height: '56px' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HueMatch
          </Typography>
          <Button color="inherit" onClick={handleHomeClick}>
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
        <Box className="game-container">
          <Box className="title-container">
            <Typography variant="h2" className="game-title">
              {nameSubmitted ? 
                (playerCount === 1 ? `Welcome ${players[0]}! Enjoy the game.` : `Hello ${players[currentPlayerIndex]}! It's your turn.`) 
                : 'Color Sequence Challenge'}
            </Typography>
            <Typography variant="body1" className="game-instructions">
              {nameSubmitted ? 'Match the color sequence by clicking the correct boxes in order to score points!' : 'Select the number of players, enter names, and start the game!'}
            </Typography>
            {nameSubmitted && (
              <Typography variant="body1" className="score-info">
                {players.map((name, index) => (
                  <div key={index}>{name}: {scores[index]}</div>
                ))}
              </Typography>
            )}
            {!nameSubmitted && (
              <Box>
                <TextField
                  label="Select number of players"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  select
                  value={playerCount}
                  onChange={handlePlayerCountChange}
                  SelectProps={{ native: true }}
                >
                  <option value={1}>1 Player</option>
                  <option value={2}>2 Players</option>
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                </TextField>
                {playerNameInputs.map((name, index) => (
                  <TextField
                    key={index}
                    label={`Player ${index + 1} Name`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => {
                      const newNames = [...playerNameInputs];
                      newNames[index] = e.target.value;
                      setPlayerNameInputs(newNames);
                    }}
                  />
                ))}
                <Box className="button-container">
                  <Button
                    variant="contained"
                    className="button submit-button"
                    onClick={handleSubmitNames}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    className="button clear-button"
                    onClick={handleClearNames}
                  >
                    Clear
                  </Button>
                </Box>
              </Box>
            )}
            {nameSubmitted && (
              <Box>
                <ColorSchemeGrid targetColors={targetColors} />
                <Box className="player-grid-container">
                  {shuffledColors.map((color, index) => (
                    <Box
                      key={index}
                      className="player-grid-box"
                      style={{ backgroundColor: visibleColors[index] ? color : '#fff' }}
                      onClick={() => handleClickColor(index, color)}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartGame}
                  className="start-game-button"
                >
                  {isGameFinished ? 'Next Player' : 'Start Game'}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Navigation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to leave the game? Any unsaved progress will be lost.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(true)} color="primary">Yes</Button>
          <Button onClick={() => handleCloseDialog(false)} color="secondary">No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
