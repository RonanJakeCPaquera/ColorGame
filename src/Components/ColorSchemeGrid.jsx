//ColorSchemeGrid.jsx
import React from 'react';
import { Box } from '@mui/material';
import '../Design/App.css'; // Import the CSS file from the new location

const ColorSchemeGrid = ({ targetColors }) => {
  return (
    <Box className="color-sequence-container">
      {targetColors.map((color, index) => (
        <Box
          key={index}
          className="color-sequence-box"
          sx={{ backgroundColor: color }}
        >
          {index + 1}
        </Box>
      ))}
    </Box>
  );
};

export default ColorSchemeGrid;
