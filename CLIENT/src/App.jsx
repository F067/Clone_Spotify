import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Screens/Layout';
import { callPost } from './Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken, setSpotifyToken } from './Store/User/slice';
import { Dialog } from '@mui/material';
import Formular from './Components/Formular';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Screens/Home';


function App() {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const handleClose = (e, r) => {
    if (r = "backdropClick") {
      return
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (!user && !localStorage.getItem("JWT")) {
      setOpen(true)
    }
  }, [user])

  useEffect(() => {
    const verifyJWT = async () => {
      let JWT = localStorage.getItem('JWT')
      if (JWT) {
        const resApi = await callPost('/users/verifyToken', {
          jwToken: JWT
        })
        if (resApi && resApi.user) {
          dispatch(setUser(resApi.user))
          dispatch(setToken(JWT))
          dispatch(setSpotifyToken(resApi.spotifyToken))
        }
        else {
          localStorage.removeItem('JWT')
          setOpen(true)
        }
      }
      else {
        setOpen(true)
      }
    }
    verifyJWT()
  }, [])

  return (
    <BrowserRouter >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: 'transparent' } }} >
        <Home />
        <Formular setOpen={setOpen} />
      </Dialog>
      <Layout />
    </BrowserRouter>
  )
}

export default App
