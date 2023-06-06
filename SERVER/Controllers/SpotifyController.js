const axios = require('axios')

const getSpotifyToken = ((req, res) => {

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

})

module.exports = {
    getSpotifyToken
}