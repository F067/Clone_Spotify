import jwt from "jsonwebtoken";
import userModel from "../Models/UserModel.js";

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]; //Pour prendre le token et pas le Bearer 
            //decoder token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findById(decoded._id).select("-password");

            next();
        }
        catch (error){
            res.status(401).json({result: false, error: "Probleme de token"})
        }
    }

    if (!token){
        res.status(401).json({result: false, error: "Probleme de JWT"})
    }
};

export default protect ;