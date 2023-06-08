import React, { useState } from 'react';
import { TextField, Button, createTheme, ThemeProvider } from '@mui/material';

function Formular() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire
  };


  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff'
      }
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", backgroundColor: "black", borderRadius: "20px", width: "auto", height: "auto", padding: "20px" }}>
          <h1 style={{ fontWeight: "bold", textAlign: "center" }}>Log in to MusicPlayer</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                style: { color: "#ffffff", backgroundColor: "white" }
              }}
              InputLabelProps={{
                style: { color: "#e0e0e0" },
              }}
            />
            <TextField
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              InputProps={{
                style: { color: "#ffffff", backgroundColor: "white" }
              }}
              InputLabelProps={{
                style: { color: "#e0e0e0" }
              }}
            />
            <Button type="submit" style={{ fontSize: 12, backgroundColor: "black" }} variant='outlined'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>

  );
}

export default Formular;
