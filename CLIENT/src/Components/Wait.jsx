import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', height:"30vh", alignItems:"center" }}>
      <CircularProgress sx={{color:"#fb3741"}} />
    </Box>
  );
}