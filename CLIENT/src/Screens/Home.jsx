import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setPlaylistLibrary } from '../Store/User/slice';
import Wait from '../Components/Wait';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

function Home() {

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const addedPlaylist = useSelector((state) => state.user.playlistLibrary);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const [localData, setLocalData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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
        const playlists = res.data.playlists.items;
        const shuffledPlaylists = shuffleArray(playlists);
        const initialLocalData = shuffledPlaylists.map(item => ({ ...item, addedToLibrary: false }));
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
    const temp = [...addedPlaylist];
    const selectedPlaylist = localData[index];
    const isPlaylistInLibrary = temp.some((playlist) => playlist.id === selectedPlaylist.id);
    if (!isPlaylistInLibrary) {
      temp.push(selectedPlaylist);
      toast.success(`La playlist ${selectedPlaylist.name} a été ajoutée à la bibliothèque.`);
      dispatch(setPlaylistLibrary(temp));
    } else {
      toast.error('Cette playlist est déjà dans votre bibliothèque.');
    }
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
    user && localData && localData.length > 0 ?
      (
        <div className="scrollable-paper">
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
                  <List sx={style} component="nav" aria-label="mailbox folders">
                    <ListItem divider>
                      <ListItemText primary={localData[selectedItemIndex].description} />
                    </ListItem>
                    <Divider light />
                    <ListItem>
                      <ListItemText primary={localData[selectedItemIndex].tracks.total + " pistes dans cette Playlist"} />
                    </ListItem>
                  </List>
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
                    <PlaylistAddIcon
                      style={{ color: addedPlaylist.some(el => el.id === item.id) ? "#fb3741" : "inherit" }}
                      onClick={() => {
                        handleAddToLibrary(index);
                      }}
                    />
                    <MoreVertIcon onClick={() => handleShowDescription(index)} />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) :
      user &&
      <Wait />
  );
}

export default Home;
