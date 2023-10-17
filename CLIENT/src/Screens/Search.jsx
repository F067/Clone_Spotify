import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Music from '../Images/Music.png';
import { useSelector } from 'react-redux';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { setPlaylistLibrary } from '../Store/User/slice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getThisIsFromSpotify } from '../Utils';
import Wait from '../Components/Wait'

function Search() {

    const [localData, setLocalData] = useState([]);
    const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
    const user = useSelector((state) => state.user.user);
    const addedPlaylist = useSelector((state) => state.user.playlistLibrary);

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

    const getPlaylists = async () => {
        let res = await getThisIsFromSpotify(spotifyToken, 5)
        if (res) {
            setLocalData(res)
        }
    }

    useEffect(() => {
        if (spotifyToken) {
            getPlaylists()
        }
    }, [spotifyToken]);


    return (
        <div style={{ width: "80vw", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "20%" }}
            >
                <img
                    src={Music}
                    alt="Icône de l'application"
                    style={{ height: "40px", width: "40px" }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Recherche par artiste..."
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {
                localData.length > 0 ?
                    <div>
                        <h2 style={{ margin: "30px", width: "80vw", fontWeight: "bold" }}>Suggestion</h2>
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

                        <h2 style={{ margin: "30px", width: "80vw", fontWeight: "bold" }}>Tendances de la semaine</h2>
                        <div>
                            <div className='thisIs-container'>
                            </div>
                        </div>
                    </div>
                    :
                    user &&
                    <Wait />
            }
        </div>
    )
}

export default Search