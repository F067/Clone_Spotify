import React, { useState } from 'react';
import { TextField, Button, ButtonGroup, InputAdornment, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { callPost } from '../Utils';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setSpotifyToken } from '../Store/User/slice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const theme = createTheme({
  palette: {
    primary: {
      main: '#121212'
    },
  },
});
const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=!*])(?=.*[0-9]).{8,}$/;

function Formular(props) {

  const { setOpen } = props
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    firstName: '',
    name: '',
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyField, setIsEmptyField] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const requiredFields = ['email', 'password'];
        const errors = [];
        requiredFields.forEach(field => {
          if (formData[field] === '') {
            errors.push(field);
          }
        });
        setIsEmptyField(errors);
        const resApi = await callPost("/users/signIn", {
          email: formData.email,
          password: formData.password
        });
        let user = resApi.userExist;
        if (resApi.JWT) {
          localStorage.setItem('JWT', resApi.JWT)
          dispatch(setToken(resApi.JWT))
          dispatch(setSpotifyToken(resApi.spotifyToken))
        }
        dispatch(setUser(user));
        setOpen(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    else {
      try {
        const requiredFields = ['firstName', 'name', 'email', 'password'];
        const errors = [];
        requiredFields.forEach(field => {
          if (formData[field] === '') {
            errors.push(field);
          }
        });
        setIsEmptyField(errors);
        const resApi = await callPost('/users/signUp', {
          firstName: formData.firstName,
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        let user = resApi.user;
        if (resApi.JWT) {
          localStorage.setItem('JWT', resApi.JWT)
          dispatch(setToken(resApi.JWT))
        }
        dispatch(setUser(user));
        dispatch(setSpotifyToken(resApi.spotifyToken))
        setOpen(false);
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  };

  const handleLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", backgroundColor: "white", borderRadius: "20px", width: "auto", height: "auto", padding: "20px" }}>
        <h1 style={{ fontWeight: "bold", textAlign: "center" }}>{` ${!isLogin ? "Créez votre compte" : "Connectez-vous à"}  Music Player`}</h1>
        <ThemeProvider theme={theme} >
          <div style={{ display: "flex", justifyContent: 'center', padding: "16px" }}>
            <ButtonGroup >
              <Button
                style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }}
                onClick={handleLogin}
                variant={!isLogin ? "contained" : "outlined"}
                disabled={isLogin}
              >
                Connexion
              </Button>
              <Button
                style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }}
                onClick={handleLogin}
                variant={isLogin ? "contained" : "outlined"}
                disabled={!isLogin}
              >
                Créer un compte
              </Button>
            </ButtonGroup>
          </div>
        </ThemeProvider>

        <div style={{ textAlign: "center", marginBottom: "15px", width: "auto", fontSize: "12px", display: "flex", justifyContent: "center" }}>
          {errorMessage && (
            <div style={{ maxWidth: "80%", }} className="error-message">{errorMessage}</div>
          )}
        </div>


        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <TextField
                name="firstName"
                label="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={isEmptyField.includes("firstName")}
              />
              <TextField
                name="name"
                label="Nom"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                error={isEmptyField.includes("name")}
              />
            </div>
          )}
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            size="small"
            fullWidth
            error={isEmptyField.includes("email")}
          />

          <TextField
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            size="small"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            error={
              isEmptyField.includes('password') || !passwordRegex.test(formData.password)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "16px" }}>
            <Button className='myButton black' type="submit" variant='outlined'>
              {isLogin ? "Se connecter" : "S'enregistrer"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Formular;
