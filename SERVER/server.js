const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const SpotifyRoute = require('./Routes/SpotifyAPI')

require('dotenv').config();
app.use(cors());

app.use('/spotify', SpotifyRoute)

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
