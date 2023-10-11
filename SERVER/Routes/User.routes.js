import { Router } from 'express';
const router = Router();
import { createUser, signInUser, verifyJWT, updateUserProfile, deleteAccount } from '../Controllers/User.controllers.js';
import protect from '../Middleware/AuthMiddleware.js'

router.post('/signUp', createUser);
router.post('/signIn', signInUser);
router.post('/verifyToken', verifyJWT);
router.post('/updateUser', protect, updateUserProfile);
router.post('/deleteUser', protect, deleteAccount);



export default router;