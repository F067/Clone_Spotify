const axios = require('axios');

const getAccessToken = async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    if (response.status === 201) {
      const { access_token, expires_in, token_type } = response.data;
      return res.json({ access_token, expires_in, token_type });
    } else {
      console.error('Failed to retrieve token:', response.data.error);
    }
  } catch (error) {
    console.error('Error retrieving token:', error.message);
  }
};

module.exports = {
  getAccessToken
};
