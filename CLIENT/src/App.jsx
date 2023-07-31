import React, {useEffect, useState} from 'react';
import { BrowserRouter} from 'react-router-dom';
import Layout from './Screens/Layout';
import { callPost } from './Utils';
import { useDispatch } from 'react-redux';
import { setUser } from './Store/User/slice';
import { Dialog } from '@mui/material';
import Formular from './Components/Formular';


function App() {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const handleClose = (e, r) => {
    if (r = "backdropClick") {
      return
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    const verifyJWT = async () => {
      let JWT = localStorage.getItem('JWT')
      if (JWT) {
        const resApi = await callPost('/users/verifyToken', {
          jwToken: JWT
        })
        if(resApi && resApi.user){
          dispatch(setUser(resApi.user))
        }
        else{
          //TODO : afficher un message d'erreur
          localStorage.removeItem('JWT')
          setOpen(true)
        }
      }
      else{
        setOpen(true)

      }
    }
    verifyJWT()
  }, [])

  return (
    <BrowserRouter>
    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: 'transparent' } }} >
        <Formular setOpen={setOpen} />

      </Dialog>
      <Layout />
    </BrowserRouter>
  )
}

export default App
