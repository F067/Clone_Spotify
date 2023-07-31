import { Router } from 'express';
const router = Router();
import { createUser, signInUser, verifyJWT } from '../Controllers/User.controllers.js';

router.post('/signUp', createUser);
router.post('/signIn', signInUser);
router.post('/verifyToken', verifyJWT);

export default router;