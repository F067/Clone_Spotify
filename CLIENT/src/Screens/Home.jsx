import React from 'react'
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Player />
      <div style={{ display: "flex", justifyContent: "end", width: "100vw" }}>
        <Link to="/Login">
          <div style={{ marginTop: 10, padding: 5 }}>
            <Button style={{ fontSize: 12 }} variant='outlined'>Login</Button>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Home
