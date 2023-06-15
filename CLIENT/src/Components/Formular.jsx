import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function Formular(props) {

  const {setOpen} = props

  const [formData, setFormData] = useState({
    email: '',
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
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>Connectez vous à Music Player</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            name="password"
            label="Mot de passe"
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
            Connexion
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Formular;
