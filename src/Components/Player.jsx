import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AlbumIcon from '@mui/icons-material/Album';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function Player() {

    const playerInfo = [
        { title: "Comfortably Numb", artiste: "Pink Floyd" }
    ]
    return (
        <div className='player-bottom'>
            <div style={{ minHeight: "5vw", margin: "0px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", }}>
                    <div style={{ fontSize: "5px", marginRight: "10px" }}><AlbumIcon /></div>
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
                <div><PlayCircleIcon style={{fontSize:30}} /></div>
                <div>Volume etc</div>
            </div>
        </div>

    )
}

