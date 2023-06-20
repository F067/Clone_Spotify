const express = require('express');
const router = express.Router();
const spotifyController = require('../Controllers/Spotify.controllers');

router.post('/token', spotifyController.getAccessToken);

module.exports = router;
