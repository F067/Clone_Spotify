import React, { useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { callPost } from './Utils';
import { useDispatch } from 'react-redux';
import { setAccessToken, setExpiresAt, setTokenType } from './Store/Token/slice';
import Layout from './Screens/Layout';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    callPost('/spotify/token')
      .then(response => {
        const accessToken = response.access_token;
        const expiresIn = response.expires_in
        const tokenType = response.token_type
        dispatch(setAccessToken(accessToken));
        dispatch(setExpiresAt(Date.now() + expiresIn * 1000));
        dispatch(setTokenType(tokenType))
      })
      .catch(error => {
        console.error('Error fetching Spotify access token:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
