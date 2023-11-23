import userModel from '../Models/UserModel.js';
import axios from 'axios';

export async function addToLibrary(req, res) {
    try {
        const { libId } = req.body;
        if (!libId) {
            return res.status(500).json({ error: "Erreur lors de l'ajout de la playlist" });
        }
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { library: libId } },
            { new: true } // Pour renvoyer le document mis à jour
        );
        return res.status(201).json({ message: "Playlist ajoutée avec succès", user: updatedUser });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de l'ajout de la playlist" });
    }
}

export async function getAllPlaylistsFromLibrary(req, res) {
    try {
        const { libIds, spotifyToken } = req.body;
        let librarys = []
        for (var i = 0; i < libIds.length; i++) {
            const res = await axios.get(`https://api.spotify.com/v1/playlists/${libIds[i]}`, {
                headers: {
                    Authorization: `Bearer ${spotifyToken}`,
                }
            })
            if (res) {
                console.log(res)
                librarys.push(res.data)
            }
        }
        return res.status(201).json({ data: librarys })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de la récupération des playlists" });
    }
}

export async function removeFromLibrary(req, res) {
    try {
        const { libId } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { library: libId } },
            { new: true }
        )
        if (updatedUser) {
            return res.status(201).json({ user:updatedUser });
        } else {
            console.error(response.data);
            return res.status(500).json({ error: 'Erreur lors de la suppression de la playlist de la bibliothèque.' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la suppression de la playlist de la bibliothèque.' });
    }
}
