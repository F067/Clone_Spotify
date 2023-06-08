import React, { useEffect } from 'react';
import { callPost } from './Utils';
import { useDispatch } from 'react-redux';
import { setAccessToken, setExpiresAt, setTokenType } from './Store/Token/slice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Library from './Screens/Library';
import Playlist from './Screens/Playlist';
import FavoriteSongs from './Screens/FavoriteSongs';
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
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Library" element={<Library />} />
        {/* <Route path="/SignIn" element={<SignIn />} /> */}
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/FavoriteSongs" element={<FavoriteSongs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
