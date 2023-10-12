import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'

function Home() {

  const user = useSelector((state) => state.user.user)
  const spotifyToken = useSelector((state) => state.user.spotifyToken?.access_token)
  const [isLiked, setIsLiked] = useState(false)
  const [localData, setLocalData] = useState([])
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = (direction) => {
    const cardWidth = 300; // Largeur de chaque carte en pixels
    const offset = direction === 'left' ? -cardWidth : cardWidth;
    setScrollX(scrollX + offset);
  };

  const handleLikedSong = () => {
    setIsLiked(!isLiked)
  }

  const getThisIsFromSpotify = async () => {
    try {
      const res = await axios.get("https://api.spotify.com/v1/search?q=thisis&type=playlist&limit=10", {
        headers: {
          'Authorization': `Bearer ${spotifyToken}`
        }
      });
      if (res) {
        setLocalData(res.data.playlists.items)
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API Spotify : ", error);
    }
  }

  useEffect(() => {
    if (spotifyToken) {
      getThisIsFromSpotify();
    }
  }, [spotifyToken]);


  return (
    user && localData && localData &&

    <div className="carrousel-container">
      <div className="carrousel" style={{ transform: `translateX(${scrollX}px)` }}>
        {localData.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.images[0].url} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <button className="scroll-button" onClick={() => handleScroll('left')}>
        &#8249;
      </button>
      <button className="scroll-button" onClick={() => handleScroll('right')}>
        &#8250;
      </button>
    </div>

  )
}

export default Home