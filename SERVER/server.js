const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const SpotifyRoute = require('./Routes/Spotify.routes');
const UserRoute = require('./Routes/User.routes');

//FichierDbConnect
require('./Models/Db');
//dotenv
require('dotenv').config();
//cors
app.use(cors());
//routes
app.use(express.json());
app.use('/spotify', SpotifyRoute);
app.use('/users', UserRoute);
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
