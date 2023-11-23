import { Router } from 'express';
const router = Router();
import { createUser, signInUser, verifyJWT, updateUserProfile, deleteAccount } from '../Controllers/User.controllers.js';
import { addToLibrary, getAllPlaylistsFromLibrary, removeFromLibrary } from '../Controllers/Library.controller.js';
import { addToLiked, removeFromLiked } from '../Controllers/Liked.controller.js';
import protect from '../Middleware/AuthMiddleware.js'

router.post('/signUp', createUser);
router.post('/signIn', signInUser);
router.post('/verifyToken', verifyJWT);
router.put('/updateUser', protect, updateUserProfile);
router.delete('/deleteUser', protect, deleteAccount);
router.post('/addToLibrary', protect, addToLibrary)
router.post('/getAllPlaylistsFromLibrary', protect, getAllPlaylistsFromLibrary)
router.delete('/removeFromLibrary', protect, removeFromLibrary)
router.post('/addToLiked', protect, addToLiked)
router.delete('/removeFromLiked', protect, removeFromLiked)

export default router;