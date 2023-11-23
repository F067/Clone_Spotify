import express, { json } from 'express';
const app = express();
const port = 3001;
import cors from 'cors';
import SpotifyRoute from './Routes/Spotify.routes.js';
import UserRoute from './Routes/User.routes.js';
import { config } from 'dotenv';

//FichierDbConnect
import './Models/Db.js';
//dotenv
config()
//cors (autoriser la communication entre front et back depuis des domaines differents)
app.use(cors());
//permet d'utiliser req.body
app.use(json());
//routes
app.use('/spotify', SpotifyRoute);
app.use('/users', UserRoute);
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
