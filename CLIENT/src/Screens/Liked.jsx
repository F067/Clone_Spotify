import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import { useSelector } from 'react-redux'
import { getSeveralTracks } from '../Utils';
import TrackTable from '../Components/TrackTable';

function Liked() {

  const likedSong = useSelector((state) => state.user.user?.likedSong);
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token);
  const [localData, setLocalData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    if (likedSong && likedSong.length > 0) {
      getTracksFromSpotify()
    }
    else {
      setLocalData([])
    }
  }, [likedSong])

  const getTracksFromSpotify = async () => {
    const res = await getSeveralTracks(spotifyToken, likedSong);
    if (res) {
      const dataTrack = res.map(el => {
        return {
          track: el
        };
      });
      setLocalData(dataTrack);
    }
  };


  return (
    <div>
      <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
      <div className="scrollable-paper">
        <div className='thisIs-container'>
          {
            localData.length == 0 ?
              <span className='mobile-title' style={{ color: "white", fontSize: "30px", fontWeight: "bold", marginTop: '50px' }}>Vous n'avez pas de titre liké pour le moment</span>
              :
              <TrackTable track={localData.filter(el => {
                const trackNameMatches = el.track.name.toLowerCase().includes(inputSearch.toLowerCase());
                const artistNameMatches = el.track.artists[0].name.toLowerCase().includes(inputSearch.toLowerCase());
                return trackNameMatches || artistNameMatches;
              })} />
          }
        </div>
      </div>
    </div>
  )
}

export default Liked