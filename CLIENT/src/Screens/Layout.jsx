import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import Playlist from './Playlist';
import FavoriteSongs from './FavoriteSongs';
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import TopNav from '../Components/TopNav';
import Home from './Home';
import Search from './Search';

function Layout() {

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Player />
      <div style={{ width: "100%", margin: "20px" }}>
        <TopNav />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Routes>
            <Route exact path="/Home" element={<Home />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/FavoriteSongs" element={<FavoriteSongs />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default Layout
