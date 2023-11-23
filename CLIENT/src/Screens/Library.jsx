import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { toast } from 'react-toastify';
import { setTrack, setUser } from '../Store/User/slice';
import { getPlaylistTracks, getPlaylistsFromSpotify, callDelete } from '../Utils';
import TrackTable from '../Components/TrackTable';
import CardItem from '../Components/CardItem';
import Wait from '../Components/Wait';


function Library() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const track = useSelector((state) => state.user.track);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const selectedPlaylist = useSelector((state) => state.user.user?.library);
  const [localData, setLocalData] = useState([]);
  const [showTracks, setShowTracks] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedPlaylist && localData.length === 0) {
      getLibrary()
    }
  }, [selectedPlaylist])

  const getLibrary = async () => {
    setLoading(true)
    const res = await getPlaylistsFromSpotify(selectedPlaylist, spotifyToken, token)
    if (res) {
      setLocalData(res)
      setLoading(false)
    }
  }

  const handleRemoveFromLibrary = async (index) => {
    const res = await callDelete('/users/removeFromLibrary', { libId: selectedPlaylist[index] }, token)
    if (res) {
      let temp = [...localData]
      temp.splice(index, 1)
      setLocalData(temp)
      dispatch(setUser(res.user))
      toast.success(`La playlist "${removedPlaylist.name}" a été retirée de la bibliothèque.`);
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

  return (
    loading ?
      <Wait />
      :
      user && localData && (
        <div className="scrollable-paper">
          <div className='thisIs-container'>
            {
              localData.length === 0 ?
                <span className='mobile-title' style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>Oups Il n'y a pas encore de playlist ici !</span>
                :
                !showTracks ? (
                  localData.map((item, index) => (
                    <CardItem key={index} index={index} name={item.name} url={item.images[0].url} onImageClick={getTracks} >
                      <PlaylistRemoveIcon onClick={() => { handleRemoveFromLibrary(index) }} />
                    </CardItem>
                  ))
                ) :
                  <TrackTable track={track} handleBack={handleBack} />
            }
          </div>
        </div>
      )
  );
}

export default Library;
