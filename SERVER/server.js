const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;
const cors = require('cors');

require('dotenv').config();
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ result: "test" })
})

app.post('/spotify/token', async (req, res) => {

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const getToken = async () => {
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', `grant_type=client_credentials`, { headers: { 'Authorization': `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' } });
            if (response.status === 200) {
                const { access_token, expires_in, token_type } = response.data;
                return res.json({ access_token, expires_in, token_type })
            }
            else {
                console.error('Failed to retrieve token:', response.data.error);
            }
        }
        catch (error) {
            console.error('Error retrieving token:', error.message);
        }
    };
    getToken();

});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
