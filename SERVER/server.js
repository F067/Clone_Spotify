const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const SpotifyRoute = require('./Routes/SpotifyAPI')

//FichierDbConnect
require('./Models/Db')
//dotenv
require('dotenv').config();
//cors
app.use(cors());
//routes
app.use('/spotify', SpotifyRoute)
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
