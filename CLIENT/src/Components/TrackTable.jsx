import React, { useState, useRef, useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setPlayed } from '../Store/User/slice';
import { callDelete, callPost } from '../Utils';


function TrackTable(props) {

  const { track, handleBack } = props

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const likedSong = useSelector((state) => state.user.user?.likedSong);
  const volume = useSelector((state) => state.user.volume);
  const token = useSelector((state) => state.user.token);
  const musicPlayed = useSelector((state) => state.user.played)

  let audioElement = useRef(null)

  useEffect(() => {
    console.log(volume)
    if (audioElement.current) {
      audioElement.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (!musicPlayed) {
      return
    }
    if (musicPlayed?.song && musicPlayed.isPlaying) {
      if (audioElement.current) {
        audioElement.current.pause();
      }
      const newAudioElement = new Audio(musicPlayed.song.track.preview_url);
      newAudioElement.crossOrigin = "anonymous";

      newAudioElement.addEventListener('error', (err) => {
        console.error("Erreur lors de la lecture audio :", err);
      });

      audioElement.current = newAudioElement;

      audioElement.current.play().catch((err) => {
        console.error("Erreur lors de la lecture audio :", err);
      });
    }
    else {
      if (audioElement.current) {
        audioElement.current.pause();
      }

    }
  }, [musicPlayed])

  const handlePlay = (song) => {
    if (!musicPlayed) {
      dispatch(setPlayed({ song, isPlaying: song }));
    }
    if (musicPlayed?.song === song && musicPlayed.isPlaying) {
      dispatch(setPlayed({ song, isPlaying: null }))
    } else {
      dispatch(setPlayed({ song, isPlaying: song }));
    }
  };

  const handleLike = async (song) => {
    let res
    if (likedSong.includes(song.track.id)) {
      res = await callDelete('/users/removeFromLiked', { id: song.track.id }, token)
    } else {
      res = await callPost('/users/addToLiked', { id: song.track.id }, token)
    }
    if (res) {
      dispatch(setUser(res.user))
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
      <div style={{ width: '90%' }}>
        <div>
          {handleBack &&
            < ArrowBackIcon className='arrowBack' onClick={handleBack} />
          }
        </div>
        <table style={{ width: '100%' }} cellPadding="0" cellSpacing="0" >
          <thead>
            <tr>
              {/* <td className='tableCustomHead mobile'>#</td> */}
              <td className='tableCustomHead'></td>
              <td className='tableCustomHead'>Artiste</td>
              <td className='tableCustomHead'></td>
              <td className='tableCustomHead'><AccessTimeIcon /></td>
              <td className='tableCustomHead mobile'></td>
            </tr>
          </thead>
          <tbody>
            {track.map((song, index) => (
              <tr key={index} style={{ border: 'solid red 2px' }}>
                {/* <td className='tableCustom mobile'>{index + 1}</td> */}
                <td className='tableCustom'>
                  {!musicPlayed || (musicPlayed && (musicPlayed.song !== song || (musicPlayed.song === song && !musicPlayed.isPlaying))) ? (
                    <PlayCircleIcon
                      className='icon'
                      onClick={() => { song.track.preview_url !== null ? handlePlay(song) : null }}
                      style={{ fontSize: 40, color: '#FB3741', opacity: song.track.preview_url !== null ? 1 : 0.5 }}
                    />
                  ) : (
                    <PauseCircleIcon
                      className='icon'
                      onClick={() => handlePlay(song)}
                      style={{ fontSize: 40 }}
                    />
                  )}
                </td>
                <td className='tableCustom '>
                  <div style={{ fontWeight: 'bold' }}> {song.track.name}</div>
                  <div style={{ color: '#c3c3c3' }}>{song.track.artists[0].name}</div>
                </td>
                <td className='tableCustom'>
                  <FavoriteIcon
                    style={{ color: likedSong.includes(song.track.id) ? '#FB3741' : '#FFFF' }}
                    className='icon'
                    onClick={() => handleLike(song)}
                  />
                </td>
                <td className='tableCustom'>{formatDuration(song.track.duration_ms)}</td>
                <td className='tableCustom urlTd mobile'><img height="40px" src={song.track.album.images[0].url} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default TrackTable;
