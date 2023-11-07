import express from 'express';
import { findById } from './votre_model_user'; // Importez votre modèle User ici.

const app = express();
const port = 3000;

// Une route pour récupérer les playlists d'un utilisateur
app.get('/utilisateur/:id/playlists', (req, res) => {
  const userId = req.params.id; // Obtenez l'ID de l'utilisateur à partir de la demande.

  findById(userId)
    .populate('playlist') // Cela récupérera les playlists liées à l'utilisateur.
    .exec((err, user) => {
      if (err) {
        // Gérez les erreurs ici.
        res.status(500).json({ erreur: 'Une erreur est survenue' });
      } else {
        // user.playlist contiendra les playlists liées à l'utilisateur.
        res.json({ playlists: user.playlist });
      }
    });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
