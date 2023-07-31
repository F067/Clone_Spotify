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
//cors
app.use(cors());
//routes
app.use(json());
app.use('/spotify', SpotifyRoute);
app.use('/users', UserRoute);
//port
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
