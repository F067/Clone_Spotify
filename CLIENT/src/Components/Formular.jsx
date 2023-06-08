import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function Formular(props) {

  const {setOpen} = props

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false)
    // Traitement du formulaire
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", backgroundColor: "white", borderRadius: "20px", width: "auto", height: "auto", padding: "20px" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>Log in to Music Player</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
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
          />
          <Button
            type="submit"
            style={{ fontSize: 12, backgroundColor: "black" }} variant='outlined'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Formular;
