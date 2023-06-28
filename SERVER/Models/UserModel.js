const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

let userSchema = mongoose.Schema({
    firstName: String,
    name: String,
    email: String,
    password: String,
    playlist: [mongoose.Types.ObjectId]
})

//retirer le mot de passe des recherches en front
userSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
  });

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Génération du sel pour le hashage
        const salt = await bcrypt.genSalt(10);

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Remplacement du mot de passe clair par le mot de passe hashé
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.matchPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};
let userModel = mongoose.model("users", userSchema)

module.exports = userModel