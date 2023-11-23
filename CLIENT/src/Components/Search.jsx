import React from 'react'
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Music from '../Images/Music.png';

function Search(props) {

    const { inputSearch, setInputSearch } = props

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", backgroundColor: 'white', borderRadius: "20px", padding: "5px", minWidth: "30vw" }}>
                    <img
                        src={Music}
                        alt="Icône de l'application"
                        style={{ height: "40px" }}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                    <InputBase
                        sx={{ ml: 1, flex: 1, backgroundColor: 'white' }}
                        placeholder="Recherche par artiste..."
                        onChange={(e) => setInputSearch(e.target.value)}
                        value={inputSearch}
                    />
                    <IconButton
                        style={{ display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
                        type="button"
                        sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Search