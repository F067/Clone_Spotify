import userModel from '../Models/UserModel.js';
import jwt from 'jsonwebtoken'
import { getAccessToken } from './Spotify.controllers.js';


// Regex pour la validation du mot de passe
const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Créer un nouvel utilisateur
export async function createUser(req, res) {
  try {
    const { firstName, name, email, password } = req.body;
    // Vérification des champs obligatoires
    if (!firstName || !name || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
    }
    // Vérification si l'utilisateur existe déjà
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' });
    }
    // Validation du mot de passe
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: '8 caractères, 1 lettre majuscule, 1 caractère spécial, 1 chiffre' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Le format de l'email n'est pas correct" })
    }
    // Création du nouvel utilisateur
    const newUser = await userModel.create({
      firstName,
      name,
      email,
      password,
      avatar: "hendrix"
    });
    if (newUser) {
      //si l'utilisateur est crée alors generer un jwt
      const authToken = await jwt.sign({ _id: newUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: 3600 })
      let spotifyToken = await getAccessToken()
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser, JWT: authToken, spotifyToken: spotifyToken });
    } else {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
}

// Connecter un utilisateur
export async function signInUser(req, res) {
  try {
    const { email, password } = req.body;
    // Vérification des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
    }
    // Recherche de l'utilisateur par adresse e-mail
    const userExist = await userModel.findOne({ email });
    // Vérification si l'utilisateur existe
    if (!userExist) {
      return res.status(404).json({ error: 'L\'utilisateur n\'existe pas' });
    }
    // Validation du mot de passe
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: '8 caractères, 1 lettre majuscule, 1 caractère spécial, 1 chiffre' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Le format de l'email n'est pas correct" })
    }
    // Vérification du mot de passe
    const isMatch = await userExist.matchPassword(password);
    if (isMatch) {
      //si l'utilisateur correspond alors generer un jwt
      const authToken = await jwt.sign({ _id: userExist._id.toString() }, process.env.JWT_SECRET, { expiresIn: 3600 })
      let spotifyToken = await getAccessToken()
      return res.status(201).json({ userExist: userExist, JWT: authToken, spotifyToken: spotifyToken });
    } else {
      return res.status(401).json({ error: 'Mauvais mot de passe' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
}

// Modifier le profil d'un utilisateur
export async function updateUserProfile(req, res) {
  try {
    const { firstName, name, email, avatar } = req.body;

    // Vérification des champs obligatoires
    if (!firstName || !name || !email || !avatar) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
    }
    // Mettre à jour les informations
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { firstName, name, email, avatar } },
      { new: true } // Pour obtenir le nouvel utilisateur mis à jour
    );
    if (updatedUser) {
      return res.status(201).json({ message: 'Profil mis à jour avec succès', user: updatedUser });
    } else {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur' });
  }
}

export async function deleteAccount(req, res) {
  try {
    const deletedUser = await userModel.findOneAndDelete({ _id: req.user._id });

    if (deletedUser) {
      console.log(`Compte supprimé : ${deletedUser}`);
      return res.status(201).json({ message: 'Compte supprimé' });
    } else {
      return res.status(404).json({ error: 'Aucun utilisateur trouvé pour la suppression' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
  }
}

export async function verifyJWT(req, res) {
  const { jwToken } = req.body
  if (jwToken) {
    try {
      let decoded = jwt.verify(jwToken, process.env.JWT_SECRET)
      if (decoded) {
        let user = await userModel.findOne({ _id: decoded._id })
        let spotifyToken = await getAccessToken()
        return res.status(201).json({ user: user, spotifyToken: spotifyToken })
      }
    }
    catch (error) {
      return res.status(201).json({ error: "validité exp" })
    }
  }
  else {
    return res.status(500).json({ error: 'No token' })
  }
}