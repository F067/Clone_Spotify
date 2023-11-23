import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import { setTrack, setUser } from '../Store/User/slice';
import Wait from '../Components/Wait';
import { getThisIsFromSpotify, getPlaylistTracks, callPost } from '../Utils';
import CardItem from '../Components/CardItem';
import TrackTable from '../Components/TrackTable';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

function Home() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const addedPlaylist = useSelector((state) => state.user.user?.library);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const token = useSelector((state) => state.user.token);
  const track = useSelector((state) => state.user.track);
  const [localData, setLocalData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showTracks, setShowTracks] = useState(false)

  const handleAddToLibrary = async (index) => {
    const selectedPlaylist = localData[index]
    const isPlaylistInLibrary = addedPlaylist.some((id) => id === selectedPlaylist.id);
    if (!isPlaylistInLibrary) {
      const res = await callPost('/users/addToLibrary', { libId: selectedPlaylist.id }, token)
      if (res) {
        toast.success(`La playlist ${selectedPlaylist.name} a été ajoutée à la bibliothèque.`);
        dispatch(setUser(res.user))
      }
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

  const getPlaylists = async () => {
    let res = await getThisIsFromSpotify(spotifyToken, 50)
    if (res) {
      setLocalData(res)
    }
  }

  const getTracks = async (index) => {
    if (index >= 0 && index < localData.length) {
      let playlistId = localData[index].id;
      let res = await getPlaylistTracks(spotifyToken, playlistId);
      if (res) {
        setShowTracks(true)
        dispatch(setTrack(res));
      }
    }
  }

  const handleBack = () => {
    setShowTracks(false)
  }

  useEffect(() => {
    if (spotifyToken) {
      getPlaylists()
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

            {
              !showTracks ?

                localData.map((item, index) => (
                  <CardItem key={index} index={index} onImageClick={getTracks} url={item.images[0].url} name={item.name} >
                    <PlaylistAddIcon
                      style={{ color: addedPlaylist.some(el => el === item.id) ? "#fb3741" : "inherit" }}
                      onClick={() => {
                        handleAddToLibrary(index);
                      }}
                    />
                    <MoreVertIcon onClick={() => handleShowDescription(index)} />
                  </CardItem>
                ))
                :
                <TrackTable track={track} handleBack={handleBack} />
            }
          </div>
        </div>
      ) :
      user &&
      <Wait />
  );
}

export default Home;
