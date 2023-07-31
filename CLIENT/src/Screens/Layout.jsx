import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import Playlist from './Playlist';
import FavoriteSongs from './FavoriteSongs';
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import UserAvatarIcon from '../Components/UserAvatarIcon';
import { useSelector } from 'react-redux';

function Hello(props) {
  return (
    <div>
      {props.user &&
        <span>
          Salut {props.user.firstName}
        </span>
      }
    </div>
  )
}
function Layout() {

  const user = useSelector((state) => state.user.user)
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Player />
      <div style={{ width: "100%", margin: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}><UserAvatarIcon /></div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Routes>
            <Route exact path="/" element={<Hello user={user} />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/FavoriteSongs" element={<FavoriteSongs />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default Layout
