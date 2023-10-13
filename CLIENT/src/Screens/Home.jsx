import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPlaylistLibrary } from '../Store/User/slice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Home() {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const [localData, setLocalData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

  const getThisIsFromSpotify = async () => {
    try {
      const res = await axios.get(
        "https://api.spotify.com/v1/search?query=this+is&type=playlist&include_external=audio&locale=fr-FR%2Cfr%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=50", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
      );
      if (res) {
        // Obtenir les éléments de la réponse de l'API
        const playlists = res.data.playlists.items;

        // Mélanger les éléments de manière aléatoire
        const shuffledPlaylists = shuffleArray(playlists);
        const initialLocalData = shuffledPlaylists.map(item => ({ ...item, addedToLibrary: false }));
        // Stocker les données mélangées dans localData
        setLocalData(initialLocalData);
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API Spotify : ", error);
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleAddToLibrary = (index) => {
    const updatedLibrary = [...localData];
    const selectedPlaylistCopy = [...selectedPlaylist];
    selectedPlaylistCopy.push(updatedLibrary[index]);
    setSelectedPlaylist(selectedPlaylistCopy);
    dispatch(setPlaylistLibrary(selectedPlaylistCopy));
  };



  const handleShowDescription = (index) => {
    setSelectedItemIndex(index);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (spotifyToken) {
      getThisIsFromSpotify();
    }
  }, [spotifyToken]);

  return (
    user && localData && localData.length && (
      <Paper sx={{ backgroundColor: '#121212' }} className="scrollable-paper">

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {selectedItemIndex !== null && (
                <div >
                  <h2 style={{ color: 'black', margin: "10px" }}>
                    {localData[selectedItemIndex].description}
                  </h2>
                  <h2 style={{ color: 'black', margin: "10px" }}>
                    {localData[selectedItemIndex].tracks.total} pistes dans cette Playlist
                  </h2>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <div className='thisIs-container'>
          {localData.map((item, index) => (
            <div
              className="card"
              key={index}
            >
              <div >
                <img src={item.images[0].url} alt={item.name} style={{ width: '100%' }} />
                <h2 style={{ fontWeight: 'bold' }}>{item.name}</h2>
                <h3 style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <AddIcon
                    style={{ color: item.addedToLibrary && "#fb3741" }}
                    onClick={() => {
                      handleAddToLibrary(index);
                      setSelectedPlaylist(localData[index]);
                    }}
                  />
                  <MoreVertIcon onClick={() => handleShowDescription(index)} />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    )
  );
}

export default Home;
