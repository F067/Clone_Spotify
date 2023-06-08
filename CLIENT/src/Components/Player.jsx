import React, { useState } from 'react'
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
import {Box, Stack, Slider} from '@mui/material';

export default function Player() {
    const [volume, setVolume] = useState(30);
    const [isPlaying, setisPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    const handleChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handleVolumeDown = () => {
        if (volume > 0) {
            setVolume(volume - 5)
        }
        else {
            setVolume(0)
        }
    }

    const handleVolumeUp = () => {
        if (volume < 100) {
            setVolume(volume + 5)
        }
        else {
            setVolume(100)
        }
    }

    const handlePlayOrPause = () => {
        setisPlaying(!isPlaying)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat)
    }

    const handleRandomSongs = () => {
        setIsRandom(!isRandom)
    }

    const playerInfo = [
        { title: "Comfortably Numb", artiste: "Pink Floyd" }
    ]
    return (
        <div className='player-bottom'>
            <div style={{ minHeight: "5vw", margin: "0px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", }}>
                    <div style={{ marginRight: "10px" }}><AlbumIcon style={{ fontSize: "80px" }} /></div>
                    {
                        playerInfo.map((el, index) => {
                            return (
                                <div key={index}>
                                    <h3 style={{ fontSize: "13px", fontWeight: "bold" }}>{el.title}</h3>
                                    <p style={{ color: "#c3c3c3", fontSize: "11px" }}>{el.artiste}</p>
                                </div>
                            )
                        })
                    }
                    <div style={{ marginLeft: " 20px", fontSize: "5px", color: isLiked ? "#20CA5F" : "#FFFF" }}><FavoriteIcon onClick={() => handleLike()} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <ShuffleIcon onClick={() => handleRandomSongs()} style={{ fontSize: 30, color: isRandom ? "#20CA5F" : "#FFFF" }} />
                    <FastRewindIcon style={{ fontSize: 30 }} />
                    {
                        isPlaying ?
                            <PauseCircleIcon onClick={() => handlePlayOrPause()} style={{ fontSize: 50 }} />
                            :
                            <PlayCircleIcon onClick={() => handlePlayOrPause()} style={{ fontSize: 50 }} />
                    }
                    <FastForwardIcon style={{ fontSize: 30 }} />
                    {
                        isRepeat ?
                            < RepeatOneIcon onClick={() => handleRepeat()} style={{ fontSize: 30, color: "#20CA5F" }} />
                            :
                            <RepeatIcon onClick={() => handleRepeat()} style={{ fontSize: 30 }} />
                    }
                </div>
                <div>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <VolumeDown onClick={() => handleVolumeDown()} />
                            <Slider sx={{ color: '#FFF' }} aria-label="Volume" value={volume} onChange={handleChange} />
                            <VolumeUp onClick={() => handleVolumeUp()} />
                        </Stack>
                    </Box>
                </div>
            </div>
        </div>
    )
}

