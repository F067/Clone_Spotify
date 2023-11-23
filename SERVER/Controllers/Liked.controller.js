import userModel from '../Models/UserModel.js';

export async function addToLiked(req, res) {
    try {
        const { id } = req.body
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.user._id },
            { $addToSet: { likedSong: id } },
            { new: true }
        )
        if (updatedUser) {
            return res.status(201).json({ user: updatedUser })
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de l'ajout du titre" });
    }
}

export async function removeFromLiked(req, res) {
    try {
        const { id } = req.body
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { likedSong: id } },
            { new: true }
        )
        if (updatedUser) {
            return res.status(201).json({ user: updatedUser });
        } else {
            console.error(response.data);
            return res.status(500).json({ error: 'Erreur lors de la suppression du titre.' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur lors de l'ajout du titre" });
    }
}