const userModel = require('../Models/UserModel');

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
    // Création du nouvel utilisateur
    const newUser = await userModel.create({
      firstName,
      name,
      email,
      password,
    });
    if (newUser) {
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } else {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
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
    // Vérification du mot de passe
    const isMatch = await userExist.matchPassword(password);
    if (isMatch) {
      return res.status(201).json({userExist});
    } else {
      return res.status(401).json({ error: 'Mauvais mot de passe' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};
