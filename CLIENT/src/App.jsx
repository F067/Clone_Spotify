import React, { useEffect } from 'react';
import { callPost } from './Utils';
import { useDispatch } from 'react-redux';
import { setAccessToken, setExpiresAt } from './Store/Token/slice';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Playlist from './Screens/Playlist';
import './App.css'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    callPost('spotify/token')
      .then(response => {
        const accessToken = response.data.access_token;
        const expiresIn = response.data.expires_in
        dispatch(setAccessToken(accessToken));
        dispatch(setExpiresAt(Date.now() + expiresIn * 1000));

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
