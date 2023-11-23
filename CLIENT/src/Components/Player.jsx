import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AlbumIcon from '@mui/icons-material/Album';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Box, Stack, Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayed, setVolume } from '../Store/User/slice';

export default function Player() {
    const dispatch = useDispatch();
    const [isRepeat, setIsRepeat] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    const musicPlayed = useSelector((state) => state.user.played);
    const volume = useSelector((state) => state.user.volume);

    const handleChange = (event, newValue) => {
        dispatch(setVolume(newValue))
    };

    const handleVolumeDown = () => {
        if (volume > 0) {
            dispatch(setVolume(volume - 5))
        }
        else {
            dispatch(setVolume(0))
        }
    }

    const handleVolumeUp = () => {
        if (volume < 100) {
            dispatch(setVolume(volume + 5))
        }
        else {
            dispatch(setVolume(100))
        }
    }

    const handlePlayOrPause = () => {
        if (musicPlayed?.song && musicPlayed?.isPlaying) {
            dispatch(setPlayed({ song: musicPlayed.song, isPlaying: null }))
        }
        else {
            dispatch(setPlayed({ song: musicPlayed.song, isPlaying: musicPlayed.song }))
        }
    }
    const handleRepeat = () => {
        setIsRepeat(!isRepeat)
    }
    const handleRandomSongs = () => {
        setIsRandom(!isRandom)
    }

    return (
        <div className='player-bottom'>
            <div style={{ minHeight: "5vw", margin: "0px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "10px" }}>{musicPlayed && musicPlayed.song.track ? <img src={musicPlayed.song.track.album.images[0].url} alt="album image" height="50px" /> : <AlbumIcon style={{ fontSize: "80px" }} />}</div>
                    {
                        musicPlayed && musicPlayed.song.track &&
                        <div>
                            <h3 style={{ fontSize: "13px", fontWeight: "bold" }}>{musicPlayed.song.track.name}</h3>
                            <p style={{ color: "#c3c3c3", fontSize: "11px" }}>{musicPlayed.song.track.artists[0].name}</p>
                        </div>
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <div className='mobile'>
                        <ShuffleIcon
                            className='icon'
                            onClick={() => handleRandomSongs()}
                            style={{ fontSize: 30, color: isRandom ? "#FB3741" : "#FFFF" }}
                        />
                    </div>
                    <div className='mobile'>

                        <FastRewindIcon
                            className='icon'
                            style={{ fontSize: 30 }}
                        />
                    </div>
                    {
                        musicPlayed && musicPlayed.song && musicPlayed.isPlaying ?
                            <PauseCircleIcon
                                className='icon'
                                onClick={() => handlePlayOrPause()}
                                style={{ fontSize: 50 }}
                            />
                            :
                            <PlayCircleIcon
                                className='icon'
                                onClick={() => handlePlayOrPause()}
                                style={{ fontSize: 50 }}
                            />
                    }
                    <div className='mobile'>

                        <FastForwardIcon
                            className='icon'
                            style={{ fontSize: 30 }}
                        />
                    </div>
                    {
                        isRepeat ?
                            <div className='mobile'>
                                < RepeatOneIcon
                                    className='icon'
                                    onClick={() => handleRepeat()}
                                    style={{ fontSize: 30, color: "#FB3741" }}
                                />
                            </div>
                            :
                            <div className='mobile'>
                                <RepeatIcon
                                    className='icon'
                                    onClick={() => handleRepeat()}
                                    style={{ fontSize: 30 }}
                                />
                            </div>
                    }
                </div>
                {<div className='mobile'>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <VolumeDown
                                className='icon'
                                onClick={() => handleVolumeDown()}
                            />
                            <Slider sx={{ color: '#FFF' }} aria-label="Volume" value={volume} onChange={handleChange} />
                            <VolumeUp
                                className='icon'
                                onClick={() => handleVolumeUp()}
                            />
                        </Stack>
                    </Box>
                </div>}
            </div>
        </div>
    )
}

