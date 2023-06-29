const userModel = require('../Models/UserModel');
const { getAccessToken } = require('./Spotify.controllers');

// Regex pour la validation du mot de passe
const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
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
    });
    if (newUser) {
      let spotifyToken = await getAccessToken();
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser, token: spotifyToken });
    } else {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

// Connecter un utilisateur
exports.signInUser = async (req, res) => {
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
      let spotifyToken = await getAccessToken();
      return res.status(201).json({ userExist: userExist, token: spotifyToken });
    } else {
      return res.status(401).json({ error: 'Mauvais mot de passe' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};
