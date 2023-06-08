import React from 'react'
import Formular from '../Components/Formular'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", width: "100vw", height:"100%" }}>
        <Link to="/">
          <div style={{ marginTop: 10, padding: 5 }}>
            <Button style={{ fontSize: 12 }} variant='outlined'>Home</Button>
          </div>
        </Link>
      </div>
      <Formular />
    </div >
  )
}

export default Login