import React, { useState } from 'react'
import { Dialog } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Library from './Library';
import Playlist from './Playlist';
import FavoriteSongs from './FavoriteSongs';
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import Formular from '../Components/Formular';
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

  console.log(user)

  const [open, setOpen] = useState(true);

  const handleClose = (e, r) => {
    if (r = "backdropClick") {
      return
    } else {
      setOpen(false)
    }
  }

  return (
    <div style={{ display: "flex" }}>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: 'transparent' } }} >
        <Formular setOpen={setOpen} />

      </Dialog>

      <Sidebar />
      <Player />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Routes>
          <Route exact path="/" element={<Hello user={user} />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/FavoriteSongs" element={<FavoriteSongs />} />
        </Routes>
      </div>
    </div>
  )
}
export default Layout
