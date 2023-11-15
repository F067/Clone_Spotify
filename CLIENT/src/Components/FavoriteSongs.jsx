import React, { useState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { setLikedSong } from '../Store/User/slice';


function FavoriteSongs() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const track = useSelector((state) => state.user.track);
  const [isLiked, setIsLiked] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlay = (song) => {
    if (isPlaying === song) {
      setIsPlaying(null);
    } else {
      setIsPlaying(song);
    }
  };

  const handleLike = (index) => {
    if (isLiked.includes(index)) {
      const updatedLikedTracks = isLiked.filter((likedIndex) => likedIndex !== index);
      setIsLiked(updatedLikedTracks);
      dispatch(setLikedSong({ songIndex: index, liked: false }));
    } else {
      setIsLiked([...isLiked, index]);
      console.log(isLiked)
      dispatch(setLikedSong({ songIndex: index, liked: true }));
    }
  };

  function formatDuration(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedDuration;
  }

  return (
    user && track && track.length > 0 && (
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td className='tableCustomHead'></td>
            <td className='tableCustomHead'>Artiste</td>
            <td className='tableCustomHead'>Titre</td>
            <td className='tableCustomHead'></td>
            <td className='tableCustomHead'>Durée</td>
            <td className='tableCustomHead'></td>
          </tr>
        </thead>
        <tbody>
          {track.map((song, index) => (
            <tr key={index} style={{ border: 'solid red 2px' }}>
              <td className='tableCustom'>
                {isPlaying !== song ? (
                  <PlayCircleIcon
                    className='icon'
                    onClick={() => handlePlay(song)}
                    style={{ fontSize: 40, color: '#FB3741' }}
                  />
                ) : (
                  <PauseCircleIcon
                    className='icon'
                    onClick={() => handlePlay(song)}
                    style={{ fontSize: 40 }}
                  />
                )}
              </td>
              <td className='tableCustom'>{song.track.artists[0].name}</td>
              <td className='tableCustom'>{song.track.name}</td>
              <td className='tableCustom'>
                <FavoriteIcon
                  style={{ color: isLiked.includes(index) ? '#FB3741' : '#FFFF' }}
                  className='icon'
                  onClick={() => handleLike(index)}
                />
              </td>
              <td className='tableCustom'>{formatDuration(song.track.duration_ms)}</td>
              <td className='tableCustom'><img height="40px" src={song.track.album.images[0].url} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}

export default FavoriteSongs;
