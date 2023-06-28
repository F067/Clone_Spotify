import React, { useState } from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { callPost } from '../Utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/User/slice';


const theme = createTheme({
  palette: {
    primary: {
      main: '#121212', // Remplacez cette valeur par votre couleur primaire préférée
    },
  },
});

function Formular(props) {

  const dispatch = useDispatch();

  const { setOpen } = props

  const [formData, setFormData] = useState({
    firstName: '',
    name: '',
    email: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const resApi = await callPost("/users/signIn", {
        email: formData.email,
        password: formData.password
      })
      if (resApi) {
        console.log(resApi)
        dispatch(setUser(resApi.userExist))
        setOpen(false);
      }
    }
    else {
      const resApi = await callPost('/users/signUp', {
        firstName: formData.firstName,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (resApi.user) {
       
        dispatch(setUser(resApi.user))
        setOpen(false);
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
            <ButtonGroup>
              <Button style={{ borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }} onClick={handleLogin} variant={isLogin ? "contained" : "outlined"}>Connexion</Button>
              <Button style={{ borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }} onClick={handleLogin} variant={!isLogin ? "contained" : "outlined"}>Créer un compte</Button>
            </ButtonGroup>
          </div>
        </ThemeProvider>



        <form onSubmit={handleSubmit}>
          {
            !isLogin &&
            <div>
              <TextField
                name="firstName"
                label="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                size='small'
                fullWidth
              />
              <TextField
                name="name"
                label="Nom"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                size='small'
                fullWidth
              />
            </div>
          }
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            size='small'
            fullWidth
          />
          <TextField
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="dense"
            size='small'
            fullWidth
            type="password"
          />
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "16px" }}>
            <Button className='myButton black'
              type="submit"
              variant='outlined'>
              {isLogin ? "Se connecter" : "S'enregistrer"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Formular;
