import React from 'react'
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'

function Home() {
  return (
    <div style={{display: "flex"}}>
      <Sidebar />
      <Player/>
    </div>
  )
}
export default Home
