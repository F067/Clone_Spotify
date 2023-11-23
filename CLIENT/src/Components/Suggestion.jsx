import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { setTrack, setUser } from '../Store/User/slice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardItem from './CardItem';
import Wait from './Wait'
import { getPlaylistTracks, callPost, getThisIsFromSpotify } from '../Utils';
import TrackTable from './TrackTable';
import { toast } from 'react-toastify';
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


function Suggestion() {

    const [localData, setLocalData] = useState([]);
    const [showTracks, setShowTracks] = useState(false);
    const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
    const user = useSelector((state) => state.user.user);
    const track = useSelector((state) => state.user.track);
    const token = useSelector((state) => state.user.token);
    const addedPlaylist = useSelector((state) => state.user.user?.library);
    const [open, setOpen] = React.useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);


    const dispatch = useDispatch()

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
        let res = await getThisIsFromSpotify(spotifyToken, 10)
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
        <div className='scrollable-paper' >
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
                localData.length > 0 ?
                    !showTracks ?
                        <div>
                            <h2 style={{ margin: "30px", width: "80vw", fontWeight: "bold" }}>Suggestion</h2>
                            <div className='thisIs-container'>
                                {localData.map((item, index) => (
                                    <CardItem key={index} index={index} onImageClick={getTracks} url={item.images[0].url} name={item.name}>
                                        <PlaylistAddIcon
                                            style={{ color: addedPlaylist.some(el => el === item.id) ? "#fb3741" : "inherit" }}
                                            onClick={() => {
                                                handleAddToLibrary(index);
                                            }}
                                        />
                                        <MoreVertIcon onClick={() => handleShowDescription(index)} />
                                    </CardItem>
                                ))}
                            </div>
                        </div>
                        :
                        <TrackTable track={track} handleBack={handleBack} />
                    :
                    user &&
                    <Wait />
            }
        </div>
    )
}

export default Suggestion