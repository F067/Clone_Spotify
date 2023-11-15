import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { toast } from 'react-toastify';
import { setPlaylistLibrary, setTrack } from '../Store/User/slice';
import {getPlaylistTracks } from '../Utils';
import FavoriteSongs from '../Components/FavoriteSongs';

function Library() {
  const user = useSelector((state) => state.user.user);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const selectedPlaylist = useSelector((state) => state.user.playlistLibrary);
  const [localData, setLocalData] = useState([]);
  const [showTracks, setShowTracks] = useState(false)


  const dispatch = useDispatch()


  const handleRemoveFromLibrary = (index) => {
    const updatedPlaylist = [...selectedPlaylist];
    const removedPlaylist = updatedPlaylist.splice(index, 1)[0];
    if (removedPlaylist) {
      dispatch(setPlaylistLibrary(updatedPlaylist));
      toast.success(`La playlist "${removedPlaylist.name}" a été retirée de la bibliothèque.`);
    }
  }

  const getTracks = async (index) => {
    if (index >= 0 && index < selectedPlaylist.length) {
      let playlistId = selectedPlaylist[index].id;
      console.log(localData)
      let res = await getPlaylistTracks(spotifyToken, playlistId);
      if (res) {
        setShowTracks(true)
        dispatch(setTrack(res));
      }
    }
  }

  return (
    user && selectedPlaylist && (
      <div className="scrollable-paper">
        <div className='thisIs-container'>
          {
            selectedPlaylist.length === 0 ?
              <span style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>Oups Il n'y a pas encore de playlist ici !</span>
              :
              !showTracks ? (
                selectedPlaylist.map((item, index) => (
                  <div className="card" key={index}>
                    <div>
                      <img onClick={() => getTracks(index)} src={item.images[0].url} alt={item.name} style={{ width: '100%' }} />
                      <h2 style={{ fontWeight: 'bold' }}>{item.name}</h2>
                      <h3 style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <PlaylistRemoveIcon
                          onClick={() => { handleRemoveFromLibrary(index) }} />
                      </h3>
                    </div>
                  </div>
                ))
              ) :
                <FavoriteSongs />
          }
        </div>
      </div>
    )
  );
}

export default Library;
