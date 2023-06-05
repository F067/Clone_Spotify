import React, { useEffect } from 'react';
import { callPost } from './Utils';
import { useDispatch } from 'react-redux';
import { setAccessToken, setExpiresAt, setTokenType } from './Store/Token/slice';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Playlist from './Screens/Playlist';
import './App.css'

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
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
