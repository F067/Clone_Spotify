import React from 'react'
import Sidebar from '../Components/Sidebar'
import Player from '../Components/Player'
import Formular from '../Components/Formular'

function Home() {
  return (
    <div style={{display: "flex"}}>
      <Sidebar />
      <Player/>
      <Formular/>
    </div>
  )
}
export default Home
