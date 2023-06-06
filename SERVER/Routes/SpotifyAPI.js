const express = require('express')
const router = express.Router()

const {
    getSpotifyToken
} = require('../Controllers/SpotifyController')

router.post('/token', getSpotifyToken );

module.exports = router