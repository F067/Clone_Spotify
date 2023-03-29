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

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function Player() {

    const [volume, setVolume] = useState(30);

    const handleChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handleVolumeDown = ()=>{
        if(volume > 0){
            setVolume(volume - 5)
            console.log(volume)

        }
        else{
            setVolume(0)
        }
    }

    const handleVolumeUp = ()=>{
        if(volume < 100){
            setVolume(volume + 5)
            console.log(volume)
        }
        else{
            setVolume(100)
        }
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
                    <div style={{ marginLeft: " 20px", fontSize: "5px", color: "#20CA5F" }}><FavoriteIcon /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>

                    <ShuffleIcon style={{ fontSize: 30 }} />
                    <FastRewindIcon style={{ fontSize: 30 }} />
                    <PlayCircleIcon style={{ fontSize: 50 }} />
                    <FastForwardIcon style={{ fontSize: 30 }} />
                    <RepeatIcon style={{ fontSize: 30 }} />


                </div>
                <div>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <VolumeDown onClick={()=> handleVolumeDown()} />
                            <Slider sx={{ color: '#FFF' }} aria-label="Volume" value={volume} onChange={handleChange} />
                            <VolumeUp onClick={()=> handleVolumeUp()}/>
                        </Stack>
                    </Box>
                </div>
            </div>
        </div>

    )
}

