import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import Playlist from './Playlist';
import Liked from './Liked';
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import TopNav from '../Components/TopNav';
import Home from './Home';
import SearchPlaylists from './SearchPlaylists';

function Layout() {
  return (
    <div style={{ display: "flex", height:"100%" }}>
      <Sidebar />
      <Player />
      <div style={{ width: "100%"}}>
        <TopNav />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/Playlist" element={<Playlist />} />
            <Route path="/SearchPlaylists" element={<SearchPlaylists />} />
            <Route path="/Liked" element={<Liked />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default Layout
