import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Music from '../Images/Music.png';


function Search() {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <img
                src={Music}
                alt="Icône de l'application"
                style={{ height: "40px", width: "40px" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Recherche par artiste..."
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>

        </Paper>
    )
}

export default Search