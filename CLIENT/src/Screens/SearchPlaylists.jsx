import React, { useState, useEffect, useRef } from 'react'
import Search from '../Components/Search'
import Suggestion from '../Components/Suggestion'
import { getSearchFromSpotify, callPost, getPlaylistTracks } from '../Utils/index'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setTrack } from '../Store/User/slice'
import CardItem from '../Components/CardItem'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import TrackTable from '../Components/TrackTable';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { List, ListItem, ListItemText, Divider, Dialog } from '@mui/material'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

function SearchPlaylists() {

  const [open, setOpen] = React.useState(false);
  const [localData, setLocalData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [showTracks, setShowTracks] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const spotifyToken = useSelector((state) => state.user?.spotifyToken?.access_token)
  const addedPlaylist = useSelector((state) => state.user.user?.library);
  const token = useSelector((state) => state.user.token);
  const track = useSelector((state) => state.user.track);
  const dispatch = useDispatch()

  const searchTimer = useRef(null)

  useEffect(() => {
    if (inputSearch !== '') {
      clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => {
        getSearchRequest()
      }, 500)
    }

  }, [inputSearch])

  const getSearchRequest = async () => {
    const res = await getSearchFromSpotify(spotifyToken, inputSearch)
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

  const handleShowDescription = (index) => {
    setSelectedItemIndex(index);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

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

  return (
    <div>
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
      {
        !showTracks &&
        <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
      }
      {
        localData.length === 0 ?
          <Suggestion />
          :
          <div className="scrollable-paper">
            <div className='thisIs-container'>
              {
                !showTracks ?

                  localData.map((el, index) => {
                    return (
                      <CardItem key={index} onImageClick={getTracks} url={el.images[0].url} name={el.name} index={index}  >
                        <PlaylistAddIcon
                          style={{ color: addedPlaylist.some(e => e === el.id) ? "#fb3741" : "inherit" }}
                          onClick={() => {
                            handleAddToLibrary(index);
                          }}
                        />
                        <MoreVertIcon onClick={() => handleShowDescription(index)} />
                      </CardItem>)
                  })
                  :
                  <TrackTable track={track} handleBack={handleBack} />
              }
            </div>
          </div>
      }

    </div>
  )
}

export default SearchPlaylists